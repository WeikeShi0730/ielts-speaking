"use strict";
const common_vendor = require("../common/vendor.js");
const utils_index = require("../utils/index.js");
const config = require("../config.js");
const store = common_vendor.createStore({
  state: {
    // 当前练习类型
    currentType: "",
    // 当前练习主题
    currentTopic: "",
    // 当前练习问题列表
    questions: [],
    // 当前问题索引
    currentIndex: 0,
    // 用户回答记录
    qas: [],
    // 录音状态
    isRecording: false,
    // 加载
    isLoading: false,
    // 评价结果
    evaluation: null
  },
  mutations: {
    SET_TYPE(state, type) {
      state.currentType = type;
      state.currentTopic = "";
      state.questions = [];
      state.qas = [];
      state.evaluation = null;
    },
    SET_TOPIC(state, topic) {
      state.currentTopic = topic;
      state.questions = [];
      state.qas = [];
      state.evaluation = null;
    },
    SET_QUESTIONS(state, questions) {
      state.questions = questions;
      state.currentIndex = 0;
      state.qas = [];
      state.evaluation = null;
    },
    NEXT_QUESTION(state) {
      if (state.currentIndex < state.questions.length) {
        state.currentIndex++;
      }
    },
    ADD_QA(state, qa) {
      state.qas.push(qa);
    },
    SET_RECORDING(state, status) {
      state.isRecording = status;
    },
    SET_EVALUATION(state, evaluation) {
      state.evaluation = evaluation;
    }
  },
  actions: {
    // 初始化练习
    setType({ commit }, { type }) {
      commit("SET_TYPE", type);
    },
    setTopic({ commit }, { topic, questions }) {
      commit("SET_TOPIC", topic);
      commit("SET_QUESTIONS", questions);
    },
    // 提交回答
    appendAnswer({ commit, state }, { audioPath, answer }) {
      const submitQA = {
        question: state.questions[state.currentIndex],
        audioPath,
        answer
      };
      commit("ADD_QA", submitQA);
      commit("NEXT_QUESTION");
    },
    // 提交评价
    async submitQAs({ commit, state }) {
      state.isLoading = true;
      const message = utils_index.formatQAForDeepSeek(state.qas);
      await common_vendor.index.request({
        url: config.config.deepseek.apiUrl,
        method: "POST",
        header: {
          "Content-Type": "application/json"
          // Authorization: `Bearer ${config.deepseek.apiKey}`,
        },
        data: {
          model: "deepseek-chat",
          messages: [
            {
              role: "system",
              content: config.config.deepseek.promptMessage
            },
            {
              role: "user",
              content: message
            }
          ]
        },
        success: (res) => {
          const resultMessage = res.data.choices[0].message.content;
          const resultJSON = utils_index.stringToJSON(resultMessage);
          commit("SET_EVALUATION", resultJSON);
          state.isLoading = false;
          common_vendor.index.__f__("log", "at store/index.js:127", "诊断结果:", resultJSON);
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at store/index.js:130", "请求失败:", err);
          state.isLoading = false;
        }
      });
    }
  },
  getters: {
    currentQuestion: (state) => state.questions[state.currentIndex] ? state.questions[state.currentIndex] : state.questions[state.questions.length - 1],
    progress: (state) => (state.currentIndex + 1) / state.questions.length,
    isFinished: (state) => state.currentIndex >= state.questions.length
  }
});
exports.store = store;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/index.js.map

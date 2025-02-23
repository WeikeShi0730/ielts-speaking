import { createStore } from 'vuex'

export default createStore({
  state: {
    // 当前练习类型
    currentType: '',
    
    // 当前练习问题列表
    questions: [],
    
    // 当前问题索引
    currentIndex: 0,
    
    // 用户回答记录
    answers: [],
    
    // 录音状态
    isRecording: false,
    
    // 评价结果
    evaluation: null
  },
  mutations: {
    SET_TYPE(state, type) {
      state.currentType = type
    },
    SET_QUESTIONS(state, questions) {
      state.questions = questions
      state.currentIndex = 0
      state.answers = []
    },
    NEXT_QUESTION(state) {
      if (state.currentIndex < state.questions.length - 1) {
        state.currentIndex++
      }
    },
    ADD_ANSWER(state, answer) {
      state.answers.push(answer)
    },
    SET_RECORDING(state, status) {
      state.isRecording = status
    },
    SET_EVALUATION(state, evaluation) {
      state.evaluation = evaluation
    }
  },
  actions: {
    // 初始化练习
    initPractice({ commit }, { type, questions }) {
      commit('SET_TYPE', type)
      commit('SET_QUESTIONS', questions)
    },
    
    // 提交回答
    submitAnswer({ commit, state }, { audioPath, text }) {
      const answer = {
        question: state.questions[state.currentIndex],
        audioPath,
        text
      }
      commit('ADD_ANSWER', answer)
      commit('NEXT_QUESTION')
    },
    
    // 提交评价
    async submitEvaluation({ commit, state }) {
      const evaluationData = {
        questions: state.questions,
        answers: state.answers
      }
      
      // 调用Deepseek API
      const [err, res] = await uni.request({
        url: config.deepseek.apiUrl,
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.deepseek.apiKey}`
        },
        data: evaluationData
      })
      
      if (err) {
        throw new Error('Evaluation failed')
      }
      
      const result = res.data
      commit('SET_EVALUATION', result)
    }
  },
  getters: {
    currentQuestion: state => state.questions[state.currentIndex],
    progress: state => (state.currentIndex + 1) / state.questions.length,
    isFinished: state => state.currentIndex >= state.questions.length
  }
})

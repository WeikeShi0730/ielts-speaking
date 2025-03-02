<template>
  <view class="container">
    <!-- 练习类型选择 -->
    <view class="type-selector">
      <button
        v-for="type in practiceTypes"
        :key="type"
        :class="['type-btn', { active: currentType === type }]"
        @click="onTypeChange(type)"
      >
        {{ type.toUpperCase() }}
      </button>
    </view>

    <view class="topic-card">
      <picker mode="selector" :range="topics" @change="onTopicChange">
        <view class="topic-selector">
          <text class="label">SELECT TOPIC</text>
          <view class="selected-topic">
            <text class="topic-text">{{
              currentTopic || "Choose a topic"
            }}</text>
            <svg class="arrow" viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </view>
        </view>
      </picker>
    </view>

    <!-- 问题展示 -->
    <view class="question-container" v-if="currentQuestion">
      <text class="progress-text"
        >Question
        {{
          currentIndex + 1 > questions.length ? currentIndex : currentIndex + 1
        }}
        of {{ questions.length }}</text
      >
      <text class="question-text">{{ currentQuestion }}</text>
    </view>

    <!-- 录音控制 -->
    <view class="recorder-control">
      <button
        class="record-btn"
        :class="{ recording: isRecording }"
        @click="handleRecord"
      >
        {{ isRecording ? `Recording... ${recordingTime}s` : "Start" }}
      </button>
    </view>

    <view class="loading-container" v-if="isLoading">
      <view class="loading-spinner"></view>
      <text class="loading-text">Loading...</text>
    </view>

    <!-- 评价结果 -->
    <view class="evaluation-result" v-if="evaluation">
      <text class="score">Score: {{ evaluation.score }}</text>
      <text class="feedback">Feedback: {{ evaluation.feedback }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import recorder from "../../utils/recorder.js";
import api from "@/api";
import dataset from "@/static/dataset.json";
import config from "@/config";

const store = useStore();

// 响应式数据
const recordingTime = ref(0);
const isRecording = ref(false);
const selectedTopic = ref("");
const topics = ref([]);
let timer = null;

// 从 Vuex 获取状态
const currentType = computed(() => store.state.currentType);
const currentTopic = computed(() => store.state.currentTopic);
const questions = computed(() => store.state.questions);
const currentIndex = computed(() => store.state.currentIndex);
const evaluation = computed(() => store.state.evaluation);
const isLoading = computed(() => store.state.isLoading);
const currentQuestion = computed(() => store.getters.currentQuestion);
const progress = computed(() => store.getters.progress);
const isFinished = computed(() => store.getters.isFinished);
const practiceTypes = computed(() => config.practiceTypes);

// 初始化
onMounted(() => {
  recorder.init();
  const type = "part1"; // init with part 1
  topics.value = Object.keys(dataset[type]);
});

// 方法
const onTypeChange = (type) => {
  topics.value = Object.keys(dataset[type]);
  if (topics.value.length > 0) {
    store.dispatch("setType", {
      type: type,
    });
  }
};

// 主题改变时更新问题
const onTopicChange = async (event) => {
  const index = event.detail.value;
  if (topics.value.length > 0) {
    selectedTopic.value = topics.value[index];
    store.dispatch("setType", {
      type: currentType.value,
    });
    store.dispatch("setTopic", {
      topic: selectedTopic.value,
      questions: Object.values(dataset[currentType.value][selectedTopic.value]),
    });
  }
};

const handleRecord = async () => {
  // TODO: when questions are selected
  if (currentQuestion !== null && currentQuestion !== undefined) {
    if (isRecording.value) {
      isRecording.value = false;
      const { filePath, duration } = await recorder.stop();

      // 语音转文字
      // const text = await api.speechToText(filePath);
      const text = "I'm Jack, I'm 12 years old";

      // 提交回答
      await store.dispatch("appendAnswer", {
        // audioPath: filePath,
        audioPath: "",
        answer: text,
      });

      // 如果是最后一个问题，提交评价
      if (isFinished.value) {
        await store.dispatch("submitQAs");
      }
    } else {
      isRecording.value = true;
      await recorder.start();
      recordingTime.value = 0;
      timer = setInterval(() => {
        recordingTime.value = recorder.getCurrentTime();
      }, 1000);
    }
  }
};
</script>

<style>
.container {
  padding: 20px;
}

.type-selector {
  background: white;
  border-radius: 16px;
  padding: 16px;
  margin: 20px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.type-btn {
  margin: 4px;
  padding: 12px 24px;
  border-radius: 12px;
  background: linear-gradient(145deg, #f6f8fa, #ffffff);
  border: 1px solid rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.type-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.type-btn.active {
  background: linear-gradient(145deg, #007bff, #0069d9);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}

.topic-card {
  background: linear-gradient(135deg, #f6f8fa, #ffffff);
  border-radius: 16px;
  padding: 24px;
  margin: 20px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.topic-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.topic-selector {
  cursor: pointer;
}

.label {
  font-size: 12px;
  font-weight: 500;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.selected-topic {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topic-text {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.topic-text:empty::before {
  content: "Choose a topic";
  color: #999;
}

.arrow {
  width: 16px;
  height: 16px;
  fill: #666;
  transition: transform 0.2s ease;
}

.topic-selector:active .arrow {
  transform: rotate(180deg);
}

.question-container {
  background: linear-gradient(145deg, #ffffff, #f6f8fa);
  border-radius: 16px;
  padding: 24px;
  margin: 20px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.question-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.question-text {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.progress-text {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  letter-spacing: 0.5px;
}

.record-btn {
  width: 100%;
  padding: 15px;
  border-radius: 25px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

.record-btn.recording {
  background-color: #dc3545;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 20px 0;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  margin-top: 12px;
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.evaluation-result {
  margin-top: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 5px;
}

.score {
  font-size: 16px;
  font-weight: bold;
  color: #28a745;
}

.feedback {
  display: block;
  margin-top: 10px;
  color: #666;
}
</style>

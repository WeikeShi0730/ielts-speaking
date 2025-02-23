<template>
  <view class="container">
    <!-- 练习类型选择 -->
    <view class="type-selector">
      <button
        v-for="type in practiceTypes"
        :key="type"
        :class="['type-btn', { active: currentType === type }]"
        @click="selectType(type)"
      >
        {{ type.toUpperCase() }}
      </button>
    </view>

    <!-- 问题展示 -->
    <view class="question-container" v-if="currentQuestion">
      <text class="question-text">{{ currentQuestion }}</text>
      <text class="progress-text"
        >Question {{ currentIndex + 1 }} of {{ questions.length }}</text
      >
    </view>

    <!-- 录音控制 -->
    <view class="recorder-control">
      <button
        class="record-btn"
        :class="{ recording: isRecording }"
        @click="handleRecord"
      >
        {{ isRecording ? `Recording... ${recordingTime}s` : "Start Recording" }}
      </button>
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
let timer = null;

// 从 Vuex 获取状态
const currentType = computed(() => store.state.currentType);
const questions = computed(() => store.state.questions);
const currentIndex = computed(() => store.state.currentIndex);
const evaluation = computed(() => store.state.evaluation);
const currentQuestion = computed(() => store.getters.currentQuestion);
const progress = computed(() => store.getters.progress);
const isFinished = computed(() => store.getters.isFinished);
const practiceTypes = computed(() => config.practiceTypes);

// 初始化
onMounted(() => {
  recorder.init();
  store.dispatch("initPractice", {
    type: "part1",
    questions: dataset.part1,
  });
});

// 方法
const selectType = async (type) => {
  const data = dataset;
  store.dispatch("initPractice", {
    type,
    questions: data[type],
  });
};

const handleRecord = async () => {
  if (isRecording.value) {
    isRecording.value = false;
    const { filePath, duration } = await recorder.stop();

    // 语音转文字
    const text = await api.speechToText(filePath);

    // 提交回答
    await store.dispatch("submitAnswer", {
      audioPath: filePath,
      text,
    });

    // 如果是最后一个问题，提交评价
    if (isFinished.value) {
      await store.dispatch("submitEvaluation");
    }
  } else {
    isRecording.value = true;
    await recorder.start();
    recordingTime.value = 0;
    timer = setInterval(() => {
      recordingTime.value = recorder.getCurrentTime();
    }, 1000);
  }
};
</script>

<style>
.container {
  padding: 20px;
}

.type-selector {
  margin-bottom: 20px;
}

.type-btn {
  margin: 5px;
  padding: 10px 20px;
  border-radius: 5px;
}

.type-btn.active {
  background-color: #007bff;
  color: white;
}

.question-container {
  margin: 20px 0;
}

.question-text {
  font-size: 18px;
  font-weight: bold;
}

.progress-text {
  display: block;
  margin-top: 10px;
  color: #666;
}

.record-btn {
  width: 100%;
  padding: 15px;
  border-radius: 25px;
  background-color: #007bff;
  color: white;
}

.record-btn.recording {
  background-color: #dc3545;
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

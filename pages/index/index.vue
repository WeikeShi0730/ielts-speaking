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

    <view>
      <picker mode="selector" :range="topics" @change="onTopicChange">
        <view class="picker"> Current Topic：{{ selectedTopic }} </view>
      </picker>
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
const selectedTopic = ref("");
const topics = ref([]);
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
  const type = "part1"; // init with part 1
  topics.value = Object.keys(dataset[type]);
  if (topics.value.length > 0) {
    selectedTopic.value = topics.value[0];
    store.dispatch("initPractice", {
      type: type,
      questions: dataset[type],
    });
  }
});

// 方法
const selectType = (type) => {
  topics.value = Object.keys(dataset[type]);
  if (topics.value.length > 0) {
    selectedTopic.value = topics.value[0];
    store.dispatch("initPractice", {
      type,
      questions: dataset[type][selectedTopic.value],
    });
  }
};

// 主题改变时更新问题
const onTopicChange = async (event) => {
  const index = event.detail.value;
  if (topics.value.length > 0) {
    selectedTopic.value = topics.value[index];
    store.dispatch("initPractice", {
      type: currentType.value,
      questions: dataset[currentType.value][selectedTopic.value],
    });
  }
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
  background-color: #f0f0f0;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.type-btn.active {
  background-color: #007bff;
  color: white;
}

.topic-selector {
  margin-top: 15px;
}

.topic-selector select {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: white;
  font-size: 16px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007BFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px auto;
  cursor: pointer;
}

.topic-selector select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
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
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
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

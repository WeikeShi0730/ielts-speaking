"use strict";
const config = {
  // 练习类型
  practiceTypes: ["part1", "part2", "part3"],
  // 录音配置
  recordOptions: {
    duration: 1e4,
    // 10秒
    sampleRate: 16e3,
    numberOfChannels: 1,
    encodeBitRate: 48e3,
    format: "mp3"
  },
  // Deepseek API配置
  deepseek: {
    apiUrl: "https://api.deepseek.com/v1/chat/completions",
    apiKey: process.env.VUE_APP_DEEPSEEK_API_KEY,
    promptMessage: "You are an IELTS tester, based on the questions and corresponding answeres I sent to you, please give a score (out of 9) and a short feedback summary, in the format: {score: number, feedback: '' }"
  }
};
exports.config = config;
//# sourceMappingURL=../.sourcemap/mp-weixin/config.js.map

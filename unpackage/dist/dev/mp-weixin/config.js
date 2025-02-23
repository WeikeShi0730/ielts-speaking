"use strict";
const config = {
  // 练习类型
  practiceTypes: ["part1", "part3"],
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
    apiUrl: "https://api.deepseek.com/evaluate",
    apiKey: "sk-1fd33e11dfa14b6eb3584f287a145e84"
    // 请替换为实际API Key
  }
};
exports.config = config;
//# sourceMappingURL=../.sourcemap/mp-weixin/config.js.map

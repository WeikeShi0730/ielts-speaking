"use strict";
const common_vendor = require("../common/vendor.js");
const config = require("../config.js");
const api = {
  // 加载练习数据
  async loadPracticeData() {
    try {
      const [err, res] = await common_vendor.index.request({
        url: "/static/dataset.json",
        method: "GET"
      });
      if (err) {
        throw new Error("Failed to load practice data");
      }
      return res.data;
    } catch (error) {
      common_vendor.index.__f__("error", "at api/index.js:16", "Error loading practice data:", error);
      return null;
    }
  },
  // 语音转文字
  async speechToText(audioPath) {
    return new Promise((resolve, reject) => {
      common_vendor.index.ai.translateVoiceToText({
        filePath: audioPath,
        lang: "en",
        success: (res) => {
          resolve(res.result);
        },
        fail: (err) => {
          reject(err);
        }
      });
    });
  },
  // 提交评价
  async submitEvaluation(data) {
    try {
      const [err, res] = await common_vendor.index.request({
        url: config.config.deepseek.apiUrl,
        method: "POST",
        header: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.config.deepseek.apiKey}`
        },
        data
      });
      if (err) {
        throw new Error("Evaluation failed");
      }
      return res.data;
    } catch (error) {
      common_vendor.index.__f__("error", "at api/index.js:56", "Error submitting evaluation:", error);
      throw error;
    }
  }
};
exports.api = api;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/index.js.map

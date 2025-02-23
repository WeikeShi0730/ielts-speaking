import config from "../config";

export default {
  // 加载练习数据
  async loadPracticeData() {
    try {
      const [err, res] = await uni.request({
        url: "/static/dataset.json",
        method: "GET",
      });
      if (err) {
        throw new Error("Failed to load practice data");
      }
      return res.data;
    } catch (error) {
      console.error("Error loading practice data:", error);
      return null;
    }
  },

  // 语音转文字
  async speechToText(audioPath) {
    return new Promise((resolve, reject) => {
      uni.ai.translateVoiceToText({
        filePath: audioPath,
        lang: "en",
        success: (res) => {
          resolve(res.result);
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  },

  // 提交评价
  async submitEvaluation(data) {
    try {
      const [err, res] = await uni.request({
        url: config.deepseek.apiUrl,
        method: "POST",
        header: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.deepseek.apiKey}`,
        },
        data: data,
      });

      if (err) {
        throw new Error("Evaluation failed");
      }

      return res.data;
    } catch (error) {
      console.error("Error submitting evaluation:", error);
      throw error;
    }
  },
};

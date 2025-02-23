import config from "../config.js";

export default {
  recorderManager: null,
  currentFilePath: "",
  timer: null,
  recordingTime: 0,

  init() {
    this.recorderManager = uni.getRecorderManager();
  },

  start() {
    return new Promise((resolve, reject) => {
      this.currentFilePath = "";
      this.recordingTime = 0;

      this.recorderManager.start({
        duration: config.recordOptions.duration,
        sampleRate: config.recordOptions.sampleRate,
        numberOfChannels: config.recordOptions.numberOfChannels,
        encodeBitRate: config.recordOptions.encodeBitRate,
        format: config.recordOptions.format,
      });

      // 开始计时
      this.timer = setInterval(() => {
        this.recordingTime += 1;
      }, 1000);

      // 录音开始回调
      this.recorderManager.onStart(() => {
        resolve();
      });

      // 录音错误回调
      this.recorderManager.onError((err) => {
        clearInterval(this.timer);
        reject(err);
      });
    });
  },

  stop() {
    return new Promise((resolve) => {
      this.recorderManager.stop();

      // 录音停止回调
      this.recorderManager.onStop((res) => {
        clearInterval(this.timer);
        this.currentFilePath = res.tempFilePath;
        resolve({
          filePath: res.tempFilePath,
          duration: this.recordingTime,
        });
      });
    });
  },

  getCurrentTime() {
    return this.recordingTime;
  },

  getFilePath() {
    return this.currentFilePath;
  },
};

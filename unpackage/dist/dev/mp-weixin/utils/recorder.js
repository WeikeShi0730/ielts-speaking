"use strict";
const common_vendor = require("../common/vendor.js");
const config = require("../config.js");
const recorder = {
  recorderManager: null,
  currentFilePath: "",
  timer: null,
  recordingTime: 0,
  init() {
    this.recorderManager = common_vendor.index.getRecorderManager();
  },
  start() {
    return new Promise((resolve, reject) => {
      this.currentFilePath = "";
      this.recordingTime = 0;
      this.recorderManager.start({
        duration: config.config.recordOptions.duration,
        sampleRate: config.config.recordOptions.sampleRate,
        numberOfChannels: config.config.recordOptions.numberOfChannels,
        encodeBitRate: config.config.recordOptions.encodeBitRate,
        format: config.config.recordOptions.format
      });
      this.timer = setInterval(() => {
        this.recordingTime += 1;
      }, 1e3);
      this.recorderManager.onStart(() => {
        resolve();
      });
      this.recorderManager.onError((err) => {
        clearInterval(this.timer);
        reject(err);
      });
    });
  },
  stop() {
    return new Promise((resolve) => {
      this.recorderManager.stop();
      this.recorderManager.onStop((res) => {
        clearInterval(this.timer);
        this.currentFilePath = res.tempFilePath;
        resolve({
          filePath: res.tempFilePath,
          duration: this.recordingTime
        });
      });
    });
  },
  getCurrentTime() {
    return this.recordingTime;
  },
  getFilePath() {
    return this.currentFilePath;
  }
};
exports.recorder = recorder;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/recorder.js.map

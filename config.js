export default {
  // 练习类型
  practiceTypes: ['part1','part2', 'part3'],
  
  // 录音配置
  recordOptions: {
    duration: 10000, // 10秒
    sampleRate: 16000,
    numberOfChannels: 1,
    encodeBitRate: 48000,
    format: 'mp3'
  },

  // Deepseek API配置
  deepseek: {
    apiUrl: 'https://api.deepseek.com/evaluate',
    apiKey: 'sk-' // 请替换为实际API Key
  }
}

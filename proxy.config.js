module.exports = {
  localPort:8001,
  proxy:{
    '/content_api': {
      target: 'https://api.juejin.cn/',
      changeOrigin: true
    }
  }
}
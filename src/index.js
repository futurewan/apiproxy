const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware')
const getRunConfig = require('./getRunConfig.js')

const app = express();
// app.use(function(req, res, next) {
//   console.log('Time',Date.now())
//   next()
// })

getRunConfig().then(config=>{
  const { localPort, proxy = {} } = config
  const proxyList = Object.keys(proxy)
  if(proxyList.length){
    for(const proxyItem of proxyList){
      console.log('proxyItem',proxyItem,proxy[proxyItem])
      app.use(proxyItem, createProxyMiddleware(proxy[proxyItem]))
    }
  }

  if(config.localPort){
    app.use('/', createProxyMiddleware({
      target: `http://localhost:${localPort}/`,
      changeOrigin: true
    }));
  }
})

app.listen(8899,()=>{console.log('正在监听8899端口')})

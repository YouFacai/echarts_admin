module.exports = {
  publicPath: "./",
  devServer: {
    proxy: {
      '/sogou': {
        target: 'http://sa.sogou.com/new-weball',
        changeOrigin: true,
        pathRewrite: {
          '^/sogou': '/'
        }
      },
      '/chinamap': {
        target: 'https://interface.sina.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/chinamap': '/'
        }
      }
    },
  }
}



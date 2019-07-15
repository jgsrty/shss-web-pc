const path = require('path')
module.exports = {
  productionSourceMap: false,
  configureWebpack: () => ({
    resolve: {
      alias: {
        '@': path.resolve('./src')
      }
    }
  }),
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    config.plugin('define').tap(args => {
      args[0]['process.env'].BASE_URL = JSON.stringify(process.env.BASE_URL)
      return args
    })
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/style/global.scss";`
      }
    }
  }
}

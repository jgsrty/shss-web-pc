const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
  productionSourceMap: false,
  configureWebpack: () => ({
    resolve: {
      alias: {
        '@': path.resolve('./src')
      }
    }
  }),
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins:[new CompressionPlugin({
          test:/\.js$|\.html$|\.css/,
          threshold:10240,
          deleteOriginalAssets:false
        })]
      }
    }
  },
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

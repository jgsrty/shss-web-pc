const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  productionSourceMap: false,
  configureWebpack:(config) => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  chainWebpack (config)  {
    config.resolve.alias
      .set('@', resolve('src'))
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

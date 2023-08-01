const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  publicPath: '/mobile_admin/', // 署应用包时的基本 URL。 vue-router hash 模式使用
  outputDir: 'dist', //  生产环境构建文件的目录
  assetsDir: 'static', //  outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false, //eslint 检测
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  devServer: {
    port: 9527, // 端口
    open: false, // 启动后打开浏览器
    hot: true, //true开启热更新 false关闭热更新，注：开启热更新会报 parentComponent.ctx.deactivate is not a function 错误
    overlay: {
      //  当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
      warnings: false,
      errors: true
    },
    proxy: {
      //配置跨域
      '': {
          target: "http://unattended.dakemakeji.com",
          // target: "https://wurenxinlingshou.com",
          // ws:true,
          changOrigin:true,
          pathRewrite:{
              '':''
          }
      }
    }
  },
  chainWebpack:(config)=>{
    config.resolve.alias
    .set('@', resolve('src'))
    .set('assets', resolve('src/assets'))
    .set('api', resolve('src/api'))
    .set('views', resolve('src/views'))
    .set('components', resolve('src/components'))
  },
  configureWebpack:{
    module: {
      rules: [
        {
          test: /.mjs$/,
          include: /node_modules/,
          type: "javascript/auto"
        }
      ]
    }
  }
}

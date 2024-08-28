const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  // 入口文件
  entry: "./src/index.js",
  // 出口文件
  output: {
    //输出文件名
    filename: "build.js",
    // 输出的路径
    // __dirname表示当前文件的绝对路径
    path: resolve(__dirname,'build')
  },
  // 配置相关的loader
  module: {
    // 相关规则，内部是json配置项，每一个json就代表一个loader
    rules: [
      {
        // 引导打包文件和编译的文件为css文件
        test: /.css$/,
        // 内部执行哪些loader，loader的执行顺序是倒叙的，后写的先执行
        use: [
          // 识别css-laoder的js字符串为样式代码，添加到head标签
          'style-loader',
          // css-loader是将样式的代码翻译为js的模式，内部是样式的字符串
          'css-loader'
        ]
      },
      {
        test: /.less$/,
        use: [
          // 识别css-laoder的js字符串为样式代码，添加到head标签
          'style-loader',
          // css-loader是将样式的代码翻译为js的模式，内部是样式的字符串
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    // 配置html的文件
    new HtmlWebpackPlugin({
      // template表示是引入的模板文件地址
      template: './src/index.html'
    })
  ],
  // 打包模式development表示开发，production表示生产
  // mode: "development"
  mode: "production"
}
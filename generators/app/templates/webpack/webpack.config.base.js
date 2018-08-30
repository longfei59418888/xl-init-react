const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const config = require('./config');

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://${config.DEV_IP}:${config.DEV_PORT}`,
      'webpack/hot/only-dev-server',
      './src/app.js'
    ]
  },
  output: {
    filename: '[name].js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: [
      path.resolve(''), // 模块默认位置
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader', 'react-hot-loader/webpack'],
        exclude: [/(node_modules)/]
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10,
              name: 'images/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        use: 'file-loader?name=fonts/[name].[hash:8].[ext]'
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })]
};

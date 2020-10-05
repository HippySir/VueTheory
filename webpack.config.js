const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname,'dist')
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: '自己试验用的'
        }),
        new CleanWebpackPlugin()
    ],
    devServer: {
      contentBase: './dist',
      hot: true
    },
}
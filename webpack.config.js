var webpack = require('webpack');

module.exports = {
    entry: {
        index: ['./src/index.js','./css/style1.css'],
        news: './src/news.js',
        // 第三方包
        vendor: [
          'react',
          'react-dom'
        ]
    },
    output: {
        path: './dist/',
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'stage-0', 'react']
            }
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }]
    }
}
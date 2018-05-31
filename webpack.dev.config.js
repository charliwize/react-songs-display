var webpack = require('webpack');
var path = require('path');
require("babel-polyfill");

module.exports = {
    entry: ['babel-polyfill',
        path.join(__dirname, 'src/static/index.js')
    ],
    mode: "development",
    target: 'node',
    module: {
        rules: [{
            test: /\.(js|jsx|tsx)$/,
            exclude: path.join(__dirname, 'node_modules'),
            loaders: 'awesome-typescript-loader'
        }, {
            test: /\.less$/,
            loaders: ["style-loader", "css-loader", "less-loader"]
        },
        {
            test: /\.css$/,
            loaders: ["style-loader", "css-loader", "less-loader"]
        },
        {
            test: /\.(png|jpg)$/,
            loader: 'url-loader'
        },
        { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    performance: { hints: false },
    output: {
        path: path.resolve(__dirname, 'src/static'),
        filename: 'dist/bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.css', '.png', '.jpg']
    }
}
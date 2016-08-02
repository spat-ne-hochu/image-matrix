const
    path              = require('path'),
    webpack           = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    resolve: {
        extensions: ['', '.js', '.css', '.styl']
    },
    context: path.join(__dirname, 'src'),
    entry: './index',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
                test    : /\.js?$/,
                include : path.resolve(__dirname, 'src'),
                exclude : /node_modules/,
                loader  : 'babel?presets[]=es2015'
            },
            {
                test: /\.styl$/,
                include : path.resolve(__dirname, 'src'),
                exclude : /node_modules/,
                loader: ExtractTextPlugin.extract('style', 'css!stylus')
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("build.css")
    ]
};


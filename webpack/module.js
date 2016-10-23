const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    loaders: [{
        test: /\.js$/,
        loader: 'babel'
    }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss')
    }]
};

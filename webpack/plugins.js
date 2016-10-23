const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { isDevelopment, isProduction } = require('./env');

const plugins = [
    new ExtractTextPlugin('css/style.css', {
        allChunks: true
    })
];

if(isDevelopment) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
}

if (isProduction) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    );
}

module.exports = plugins;

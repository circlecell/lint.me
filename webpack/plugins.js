const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { isDevelopment, isProduction } = require('./env');

const plugins = [
    new webpack.EnvironmentPlugin(['NODE_ENV'])
];

if(isDevelopment) {
    plugins.push(
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    );
}

if (isProduction) {
    plugins.push(
        new ExtractTextPlugin('css/style.css', {
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    );
}

module.exports = plugins;

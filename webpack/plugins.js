const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SplitByPathPlugin = require('webpack-split-by-path');

const { isDevelopment, isProduction } = require('./env');

const plugins = [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new HtmlWebpackPlugin({
        template: 'index.html',
        chunksSortMode: (a, b) => {
            const order = ['manifest', 'vendor', 'app'];
            const nameA = a.names[0];
            const nameB = b.names[0];

            return order.indexOf(nameA) - order.indexOf(nameB);
        }
    }),
    new SplitByPathPlugin([{
        name: 'vendor',
        path: path.join(__dirname, '..', 'packages/frontend/node_modules/')
    }], {
        // fix https://github.com/webpack/extract-text-webpack-plugin/issues/92
        ignore: [/\.css/]
    })
];

if (isDevelopment) {
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

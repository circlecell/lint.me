/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const path = require('path');

const { NODE_ENV } = process.env;

const entry = [];
const plugins = [];

entry.push(
    'babel-polyfill',
    './js/index'
);

module.exports = {
    entry,
    plugins,
    context: path.resolve(__dirname, '..', 'packages/frontend'),
    output: {
        path: path.resolve(__dirname, '..', 'packages/backend/public'),
        filename: 'js/app.js',
        library: 'app',
        libraryTarget: 'var'
    },
    module: {
        loaders: [{
            test: /.js?$/,
            loaders: ['babel']
        }]
    },
    devtool: 'source-map'
};

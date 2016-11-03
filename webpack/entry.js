const { isDevelopment } = require('./env');

const entry = {
    app: []
};

entry.app.push(
    './css/style.css',
    './js/index'
);

if (isDevelopment) {
    entry.app.unshift('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true');
}

module.exports = entry;

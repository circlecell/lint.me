const { isDevelopment } = require('./env');

const entry = {
    app: []
};

entry.app.push(
    './css/style.css',
    './js/index'
);

if (isDevelopment) {
    //entry.app.unshift('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000');
    //entry.app.push(`webpack-dev-server/client?http://localhost:${5003}`);
    //entry.app.push('webpack/hot/dev-server'  );
    //entry.app.push(`webpack-dev-server/client?http://localhost:${5003}`);
}

module.exports = entry;

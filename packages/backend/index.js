const express = require('express');
const bodyParser = require('body-parser');
const lintRouter = require('./lint');
const { env } = process;

const app = express();

for(const varName of ['NODE_ENV', 'PORT']) {
    if(!env[varName]) {
        throw Error(`${varName} env variable is not given`);
    }
}

const { PORT, NODE_ENV } = env;

app.use(bodyParser.json());

app.use('/api/lint', lintRouter);

app.listen(PORT);

module.exports = app;

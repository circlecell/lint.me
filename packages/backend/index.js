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

if(NODE_ENV === 'production') {
    app.use(express.static(`${__dirname}/public`));
}

app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.set('views', `${__dirname}/views`);

app.get('/', (req, res) => {
    res.render('index.ejs', {});
});

app.use('/api/lint', lintRouter);



app.listen(PORT);

module.exports = app;

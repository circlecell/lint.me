const express = require('express');
const bodyParser = require('body-parser');
const lintRouter = require('./lint');

const app = express();

const { PORT } = process.env;

app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.set('views', `${__dirname}/views`);

app.get('/', (req, res) => {
    res.render('index.ejs', { });
});

app.use('/lint', lintRouter);


app.listen(PORT);

module.exports = app;

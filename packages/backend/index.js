const express = require('express');
const app = express();
const lintRouter = require('./lint');

const { PORT } = process.env;

app.set('view engine', 'ejs');

app.set('views', `${__dirname}/views`);

app.get('/', (req, res) => {
    res.render('index.ejs', {  });
});

app.use('/lint', lintRouter);

app.listen(PORT);

module.exports = app;

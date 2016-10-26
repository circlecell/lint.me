const { Router } = require('express');
const css = require('./css');
const html = require('./html');

const lintRouter = Router();

lintRouter.post('/css', css);
lintRouter.post('/html', html);

module.exports = lintRouter;

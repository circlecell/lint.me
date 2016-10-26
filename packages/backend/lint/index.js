const { Router } = require('express');
const lintRouter = Router();
const css = require('./css');
const html = require('./html');

lintRouter.post('/css', css);
lintRouter.post('/html', html);

module.exports = lintRouter;

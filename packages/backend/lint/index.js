const { Router } = require('express');
const lintRouter = Router();
const js = require('./js');

lintRouter.get('/js', js);

module.exports  = lintRouter;

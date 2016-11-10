const { Router } = require('express');
const css = require('./css');
const html = require('./html');

const router = Router();

router.post('/css', css);
router.post('/html', html);

module.exports = router;

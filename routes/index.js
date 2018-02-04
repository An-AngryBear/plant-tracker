'use strict';
var path = require('path');

const { Router } = require('express');
const router = Router();

// landing page
router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../client', 'dist/index.html'));
});

// route modules

module.exports = router;


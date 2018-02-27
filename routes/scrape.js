'use strict';

const { Router } = require('express');
const router = Router();

const { plantSearch } = require('../controllers/scrape');

router.get('/scrape/search/:entry', plantSearch);

module.exports = router;

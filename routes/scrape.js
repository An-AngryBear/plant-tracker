'use strict';

const { Router } = require('express');
const router = Router();

const { scraper } = require('../controllers/scrape');

router.get('/scrape/:entry', scraper);

module.exports = router;

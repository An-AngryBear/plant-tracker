'use strict';

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

module.exports.scraper = (req, res, next) => {
     
    let url = 'https://garden.org/plants/view/537808/Hen-and-Chicks-Sempervivum-Ursuline/';

    request(url, function (error, response, html) {
        if (!error) {
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
            let $ = cheerio.load(html);
            // Finally, we'll define the letiables we're going to capture
            let soilType, water, pests;
            let json = { soilType: "", water: "", pests: "" };
        }
    })
}
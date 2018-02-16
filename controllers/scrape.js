'use strict';

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

module.exports.scraper = (req, res, next) => {
     
    console.log("scraper started");
    let url = 'https://garden.org/plants/view/537808/Hen-and-Chicks-Sempervivum-Ursuline/';

    request(url, function (error, response, html) {
        console.log("start req")
        if (!error) {
            console.log("no error");
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
            const $ = cheerio.load(html);
            console.log("HTML", html)
            // Finally, we'll define the letiables we're going to capture
            let sunReqs, water, pests;
            let json = { sunReqs: "", water: "", pests: "" };

            console.log("HERE", $('.userlink').children());

            console.log("url", url);
        }
    })
}
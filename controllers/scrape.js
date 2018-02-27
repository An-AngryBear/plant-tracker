'use strict';

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

module.exports.plantSearch = (req, res, next) => {
    let userEntry = req.params.entry;
    let query;
    let urlStart = process.env.SEARCH_URL;
    let url = urlStart + userEntry;
    let options = {
        headers: { 'user-agent': 'node.js' }
    }
    request(url, options, function (error, response, html) {
        if (!error) {
            let $ = cheerio.load(html);
            let commonName;
            let json = [];
            $('p:contains("PlantFiles")').next().find('a').each(function () {
                let plantData = $(this).contents()[0].data;
                let plantURL = $(this).attr('href');
                let sciName = $(this).find('i').text();
                if(plantData) {
                    json.push({ commonName: plantData.replace(/\'/, '(').replace(/\'/, ')'), plantURL, sciName} );
                }
            });
            console.log("JSON", json)
        }
    })
}
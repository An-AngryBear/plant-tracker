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
            let sunReqs, water, pests;
            let json = { sunReqs: "", water: "", pests: "" };

            $('#ngabody').filter(function () {

                // Let's store the data we filter into a variable so we can easily see what's going on.

                var data = $(this);

                // In examining the DOM we notice that the title rests within the first child element of the header tag. 
                // Utilizing jQuery we can easily navigate and get the text by writing the following code:

                sunReqs = data.find('simple-table');

                console.log(sunReqs);

                // Once we have our title, we'll store it to the our json object.

                json.title = title;
            })
        }
    })
}
'use strict';

import axios from 'axios';

let webScrape = (inputVal) => {
    let params = inputVal.replace(/ /g, '+');
    console.log("params", params);
    axios.get(`/scrape/${params}`)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export { webScrape };
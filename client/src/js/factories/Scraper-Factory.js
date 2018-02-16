'use strict';

import axios from 'axios';

let webScrape = () => {
    axios.get('/scrape')
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export { webScrape };
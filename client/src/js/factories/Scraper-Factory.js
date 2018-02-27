'use strict';

import axios from 'axios';

let plantSearch = (inputVal) => {
    let params = inputVal.replace(/ /g, '+');
    console.log("params", params);
    axios.get(`/scrape/search/${params}`)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export { plantSearch };
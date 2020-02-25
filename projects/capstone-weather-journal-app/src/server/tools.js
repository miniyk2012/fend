const GEO_USERNAME = require('./config.js').GEO_USERNAME;
const fetch = require('node-fetch');
require("babel-polyfill");


async function geo_search(country, city) {
    const geoUrl = `http://api.geonames.org/searchJSON?q=${country}&name_equals=${city}\
    &maxRows=10&lang=zh&cities=cities15000&username=${GEO_USERNAME}`;
    const res = await fetch(geoUrl);
    const json = await res.json();
    return json;
}
module.exports = { geo_search };

// usage
// geo_search('china', 'shanghai').then(json => console.log(json));


const { GEO_USERNAME, DARK_SKY_API_KEY, PIXABAY_API_KEY } = require('./config.js');
const fetch = require('node-fetch');
require("babel-polyfill");


async function geo_search(country, city) {
    const geoUrl = `http://api.geonames.org/searchJSON?q=${country}&name_equals=${city}\
&maxRows=10&lang=zh&cities=cities15000&username=${GEO_USERNAME}`;
    const res = await fetch(geoUrl);
    const json = await res.json();
    return json;
}

async function weather_forecast(lat, lng) {
    const darkSkyUrl = `https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/\
${lat},${lng}?lang=zh&exclude=hourly,flags`;
    const res = await fetch(darkSkyUrl);
    const json = await res.json();
    return json;
}

async function pixabay_search(country, city) {
    const pixabayUrl = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}\
&q=${country}+${city}&image_type=photo&per_page=5&category=buildings`;
const res = await fetch(pixabayUrl);
const json = await res.json();
return json;
}
module.exports = { geo_search, weather_forecast, pixabay_search };

// usage
// geo_search('china', 'shanghai').then(json => console.log(json));
// weather_forecast(31.22222, 121.45806).then(json => console.log(json));
// pixabay_search('america', 'new york').then(json => console.log(json));

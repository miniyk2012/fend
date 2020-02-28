const { GEO_USERNAME, DARK_SKY_API_KEY, PIXABAY_API_KEY } = require('./config.js');
const fetch = require('node-fetch');
const shortid = require('shortid');
require("babel-polyfill");


async function geo_search(country, city) {
    const geoUrl = `http://api.geonames.org/searchJSON?q=${country}&name_equals=${city}\
&maxRows=10&lang=zh&cities=cities15000&username=${GEO_USERNAME}`;
    const res = await fetch(geoUrl);
    const json = await res.json();
    return json;
}

async function weather_forecast(lat, lng, timestamp) {
    const darkSkyUrl = `https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/\
${lat},${lng},${timestamp}?&exclude=hourly,currently,flags`;
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

function addTrip(db, trip) {
    const tripId = shortid.generate()
    db.get('trips')
        .push({ id: tripId, created_at: Date.now(),  ...trip })
        .write();
    return tripId;
}

function queryTrip(db, tripId) {
    return db.get('trips')
        .find({ id: tripId })
        .value();
}

function listTrips(db) {
    trips = db.get('trips')
        .sortBy('created_at')
        .reverse()
        .value();
    return trips;
}

function delTrip(db, tripId) {
    const value = db.get('trips')
        .remove({ id: tripId })
        .write();
    if (value.length == 0) {
        return 1;
    } else {
        return 0;
    }
}

module.exports = {
    geo_search, weather_forecast, delTrip,
    pixabay_search, addTrip, queryTrip, listTrips
};

// usage
// geo_search('china', 'shanghai').then(json => console.log(json));
// weather_forecast(31.22222, 121.45806, 1582764525).then(json => console.log(json));
// pixabay_search('america', 'new york').then(json => console.log(json));

const config = require('./config');
const { geo_search, weather_forecast, pixabay_search } = require('./tools');

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));


// Setup Server
const port = config.PORT;
app.listen(port, listening);

function listening() {
    // console.log(server);
    console.log(`running on localhost: ${port}`);
};

app.get('/trip/search', tripSearch);

async function tripSearch(request, response) {
    country = request.query.country;
    city = request.query.city;
    dateStr = request.query.date;
    tripDate = request.query.date;
    resp = await fastFetch(country, city, dateStr);
    result = extract_message(resp, tripDate);
    response.json(result);
}

async function slowFetch(country, city, dateStr) {
    const geo_json = await geo_search(country, city);
    const { lat, lng } = geo_json.geonames[0];
    const weather_json = await weather_forecast(lat, lng);
    const timestamp = parseInt(Date.parse(dateStr) / 1000);
    const pixabay_json = await pixabay_search(country, city, timestamp);
    return { geo_json, weather_json, pixabay_json };
}

async function fastFetch(country, city, dateStr) {
    const promise1 = async function (country, city) {
        const geo_json = await geo_search(country, city);
        let weather_json;
        const { lat, lng } = geo_json.geonames[0];
        const timestamp = parseInt(Date.parse(dateStr) / 1000);
        weather_json = await weather_forecast(lat, lng, timestamp);
        return { geo_json, weather_json };
    }(country, city);
    const promise2 = pixabay_search(country, city);

    let { geo_json, weather_json } = await promise1;
    let pixabay_json = await promise2;
    return { geo_json, weather_json, pixabay_json };
}


/**
 * 
 * @param {*} result 
 * @param {*} tripDate : YYYY-MM-DD格式, 如2020-02-28
 */
function extract_message(result) {
    const { weather_json, pixabay_json } = result;
    let photo_url, temperatureHigh, temperatureLow, summary;
    try {
        photo_url = pixabay_json.hits[0].webformatURL;
    } catch (err) {
        console.log(err);
    }
    try {
        temperatureHigh = weather_json.daily.data[0].temperatureHigh;
        temperatureLow = weather_json.daily.data[0].temperatureLow;
        summary = weather_json.daily.data[0].summary;
    } catch (err) {
        console.log(err);
    }
    return { photo_url, temperatureHigh, temperatureLow, summary }
}

app.post('/add', addData);

function addData(request, response) {
    projectData.temperature = request.body.temperature;
    projectData.date = request.body.date;
    projectData.userResponse = request.body.userResponse;
    console.log('/add: projectData=', projectData)
    response.json({ "code": "0" })
}

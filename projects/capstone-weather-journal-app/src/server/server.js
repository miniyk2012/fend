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

app.get('/trip/search', fastSearchDestination);

async function slowSearchDestination(request, response) {
    country = request.query.country;
    city = request.query.city;
    const geo_json = await geo_search(country, city);
    const { lat, lng } = geo_json.geonames[0];
    const weather_json = await weather_forecast(lat, lng);
    const pixabay_json = await pixabay_search(country, city);
    return response.json({ geo_json, weather_json, pixabay_json });
}

async function fastSearchDestination(request, response) {
    country = request.query.country;
    city = request.query.city;

    const promise1 = async function (country, city) {
        const geo_json = await geo_search(country, city);
        let weather_json;
        if (geo_json.totalResultsCount == 0) {
            weather_json = {
                code: 400,
                error: "No data"
            };
        } else {
            const { lat, lng } = geo_json.geonames[0];
            weather_json = await weather_forecast(lat, lng);
        }
        return { geo_json, weather_json };
    }(country, city);
    const promise2 = pixabay_search(country, city);
    
    let { geo_json, weather_json } = await promise1;
    let pixabay_json = await promise2;
    return response.json({ geo_json, weather_json, pixabay_json });
}

app.post('/add', addData);

function addData(request, response) {
    projectData.temperature = request.body.temperature;
    projectData.date = request.body.date;
    projectData.userResponse = request.body.userResponse;
    console.log('/add: projectData=', projectData)
    response.json({ "code": "0" })
}

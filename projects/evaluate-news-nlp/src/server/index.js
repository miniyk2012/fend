var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const Aylien = require('aylien_textapi');

const dotenv = require('dotenv');
dotenv.config();

// set aylien API credentias
let textapi = new Aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

textapi.entityLevelSentiment({
    'text': 'Yangkai is a good man'
}, function (error, response) {
    if (error === null) {
        console.log(JSON.stringify((response)));
    }
});


const app = express()

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})
const port = 8081;
// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

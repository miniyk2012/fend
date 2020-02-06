const express = require('express');
const Aylien = require('aylien_textapi');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const parse_elsa_result = require('./parse_result').parse_elsa_result;

dotenv.config();

// set aylien API credentias
const textapi = new Aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))


app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// Entity Level Sentiment Analysis
app.post('/nlp/elsa', function (req, res) {
    console.log(req.body);
    textapi.entityLevelSentiment({
        'text': req.body.text,
    }, function (error, response) {
        if (error === null) {
            console.log(JSON.stringify((response)));
            result = parse_elsa_result(response.entities);
            res.json(result);
        }
    });
})

const port = 8085;
// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})

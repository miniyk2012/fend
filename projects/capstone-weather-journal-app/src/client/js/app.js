import { PORT, APIKEY } from './config.js'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

async function getTemperature(zip) {
    // https://openweathermap.org/api
    // api.openweathermap.org/data/2.5/weather?zip=94040,us
    const url = new URL('http://api.openweathermap.org/data/2.5/weather');
    const params = { zip: zip, APPID: APIKEY }
    url.search = new URLSearchParams(params).toString();
    try {
        let response = await fetch(url);
        let data = await response.json();
        const temperature = (data.main.temp - 273.16).toFixed(2);
        console.log('temperature:', temperature);
        return temperature;
    } catch (error) {
        console.log('Oops, error: ', error);
    }
}

async function addWeather(data) {
    try {
        let response = await fetch(`http://localhost:${PORT}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        let respData = await response.json();
        if (respData.code != '0') {
            throw 'add Weather fail'
        }
    } catch (error) {
        console.log('Oops, error: ', error);
    }
}

async function updateUI() {
    let data;
    try {
        const response = await fetch(`http://localhost:${PORT}/all`);
        data = await response.json()
    } catch (error) {
        console.log('Oops, error: ', error);
    }
    const { temperature, date, userResponse } = data;
    try {
        updateText('date', 'date', date);
        updateText('temp', 'temperature', temperature + '&#8451;');
        updateText('content', 'content', userResponse);
    } catch (error) {
        console.log('Oops, error: ', error);
    }

}

function updateText(id, desc, value) {
    const divEle = document.querySelector(`#${id}`);
    divEle.innerHTML = '';
    const p = document.createElement("p");
    const h1 = document.createElement("h1");
    p.innerHTML = `${desc}: ${value}`;
    h1.appendChild(p);
    divEle.appendChild(h1);

}

function addGenerateClimateListener() {
    document.querySelector('#generate').addEventListener('click', async function (e) {
        const zip = document.querySelector('#zip').value;
        const temperature = await getTemperature(zip);
        const userResponse = document.querySelector('.myInput').value;
        const data = {
            temperature,
            date: newDate,
            userResponse,
        }
        try {
            await addWeather(data);
        } catch (error) {
            console.log('Oops, error: ', error);
        }
        await updateUI();
    });
}

export { addGenerateClimateListener }
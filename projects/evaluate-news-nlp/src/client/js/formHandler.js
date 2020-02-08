import * as config from './config';
import { checkInvalidText, checkUrl, _fetch } from './nameChecker';
import * as underscore from 'underscore';

function elsaSubmit(event) {
    event.preventDefault();
    console.log('elsaSubmit');

    // check what text was put into the form field
    const formText = document.getElementById('elsa-phrase').value.trim();
    const alertMessage = checkInvalidText(formText);
    if (alertMessage != '') {
        alert(alertMessage);
        return;
    }
    const tbody = document.querySelector('#elsa-table>tbody');
    tbody.innerHTML='';
    console.log("::: Elsa Submitted :::");
    _fetch(fetch(`http://localhost:${config.PORT}/nlp/elsa`,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ 'text': formText }),
        }), 5000)
        .then(res => res.json())
        .then(function (result) {
            render_elsa_result(result);
        }).catch(err => alert('Time out!'));
}

function sentimentSubmit(event) {
    event.preventDefault();
    console.log('sentimentSubmit');
    const inputUrl = document.getElementById('sentiment-url').value.trim();
    const alertMessage = checkUrl(inputUrl);
    if (alertMessage != '') {
        alert(alertMessage);
        return
    }
    const tbody = document.querySelector('#sentiment-table>tbody');
    tbody.innerHTML='';
    console.log("::: Sentiment Submitted :::");

    _fetch(fetch(`http://localhost:${config.PORT}/nlp/sentiment`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ 'url': inputUrl }),
    }), 5000)
    .then(res => res.json())
    .then(function name(result) {
        render_sentiment_result(result);
    }).catch(err => alert('Time out!'));
}

/* 
  result: 
  [
    {"entity_name": "Venice", "polarity": "negative", "confidence": 0.45, "type": "Location"},
    {"entity_name": "Sistine Chapel", "polarity": "positive", "confidence": 0.6, "type": "Location"}
  ]
*/
function render_elsa_result(result) {
    const tbody = document.querySelector('#elsa-table>tbody');
    if (result.length === 0) {
        alert('Entity Level Sentiment Analysis result is empty!');
        return;
    }
    
    for (let i = 0; i < result.length; i++) {
        const tr = createTr(result[i], 'elsa-table');
        tbody.appendChild(tr);
    }
}

/*
    result:
    {
    "polarity":"positive",
    "subjectivity":"subjective",
    "text":"John is a very good football player",
    "polarity_confidence":0.9999936601153382,
    "subjectivity_confidence":0.9963778207617525
    }
*/
function render_sentiment_result(result) {
    if (underscore.isEmpty(result)) {
        alert('Sentiment Analysis result is empty!');
        return;
    }

    const tbody = document.querySelector('#sentiment-table>tbody');
    const tr = createTr(result, 'sentiment-table');
    tbody.appendChild(tr);
}

function createTr(values, tableId) {
    const tr = document.createElement('tr');
    const theadTr = document.querySelector(`#${tableId}>thead>tr`);
    for (let i = 0; i < theadTr.children.length; i++) {
        const th = document.createElement('th');
        th.setAttribute('scope', 'col');
        th.innerText = values[theadTr.children[i].innerText];
        tr.appendChild(th);
    }
    return tr;
}

export { elsaSubmit, sentimentSubmit }

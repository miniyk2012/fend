import * as config from './config';
import { checkInvalidText } from './nameChecker';

function elsaSubmit(event) {
    event.preventDefault();
    console.log('elsaSubmit');

    // check what text was put into the form field
    const formText = document.getElementById('elsa-phrase').value;
    const alertMessage = checkInvalidText(formText);
    if (alertMessage != '') {
        alert(alertMessage);
        return
    }
    console.log("::: Elsa Submitted :::");
    fetch(`http://localhost:${config.PORT}/nlp/elsa`,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ 'text': formText })
        })
        .then(res => res.json())
        .then(function (result) {
            render_result(result);
        });
}

/* 
  result: 
  [
    {"entity_name": "Venice", "polarity": "negative", "confidence": 0.45, "type": "Location"},
    {"entity_name": "Sistine Chapel", "polarity": "positive", "confidence": 0.6, "type": "Location"}
  ]
*/
function render_result(result) {
    const tbody = document.querySelector('#elsa-table>tbody');

    tbody.innerHTML='';
    if (result.length === 0) {
        alert('Entity Level Sentiment Analysis result is empty!');
    }
    
    for (let i = 0; i < result.length; i++) {
        const tr = createTr(result[i]);
        tbody.appendChild(tr);
    }
}

function createTr(values) {
    const tr = document.createElement('tr');
    const theadTr = document.querySelector('#elsa-table>thead>tr');
    for (let i = 0; i < theadTr.children.length; i++) {
        const th = document.createElement('th');
        th.setAttribute('scope', 'col');
        th.innerText = values[theadTr.children[i].innerText];
        tr.appendChild(th);
    }
    return tr;
}

export { elsaSubmit }

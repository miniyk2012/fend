import * as config from './config';
import { checkForName } from './nameChecker';

function elsaSubmit(event) {
    event.preventDefault();
    console.log('elsaSubmit');

    // check what text was put into the form field
    const formText = document.getElementById('elsa-phrase').value;
    console.log(checkForName);
    checkForName(formText);

    console.log("::: Elsa Submitted :::");
    fetch(`http://localhost:${config.port}/nlp/elsa`,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ 'text': formText })
        })
        .then(res => res.json())
        .then(function (res) {
            document.getElementById('results').innerHTML = res.message
        });
}


function render_result(result) {
    
}


export { elsaSubmit }

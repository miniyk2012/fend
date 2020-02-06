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


function render_result(result) {
    
    document.getElementById('results').innerHTML = res.message
}


export { elsaSubmit }

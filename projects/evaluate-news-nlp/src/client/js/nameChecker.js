import * as config from './config';

function checkForName(inputText) {
    console.log(config.port);
    
    console.log("::: Running checkForName :::", inputText);
    let names = [
        "Picard",
        "Janeway",
        "Kirk",
        "Archer",
        "Georgiou"
    ]

    if(names.includes(inputText)) {
        alert("Welcome, Captain!")
    }
}

function checkInvalidText(inputText) {
    if (inputText.length < 20) {
        return 'Too short sentence'
    }
    return ''
}

export { checkForName, checkInvalidText}

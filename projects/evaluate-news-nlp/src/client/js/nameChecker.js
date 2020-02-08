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
    inputText = inputText.trim().replace(/\n/g, " ");
    if (inputText.length < 20) {
        return 'Too short sentence!'
    }
    const regExp = /^\w+/gm;
    if (!regExp.test(inputText)) {
        return 'This is not a sentence!'
    }

    return ''
}

function checkUrl(url) {
    url = url.trim();
    const regExp = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;
    if (!regExp.test(url)) {
        return 'This is not a valid url!'
    }
    return ''
}

export { checkForName, checkInvalidText, checkUrl }

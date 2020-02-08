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

// 让fetch也可以timeout: https://imweb.io/topic/57c6ea35808fd2fb204eef63
function _fetch(fetch_promise, timeout) {
    var abort_fn = null;

    //这是一个可以被reject的promise
    var abort_promise = new Promise(function(resolve, reject) {
           abort_fn = function() {
              reject('abort promise');
           };
    });

    //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
     var abortable_promise = Promise.race([
           fetch_promise,
           abort_promise
     ]);

     setTimeout(function() {
           abort_fn();
      }, timeout);

     return abortable_promise;
}

export { checkForName, checkInvalidText, checkUrl, _fetch }

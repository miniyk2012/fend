const { checkInvalidText, checkUrl } = require('./nameChecker');


test('empty sentence', () => {
    const alertMessage = checkInvalidText('');
    expect(alertMessage).toBe('Too short sentence!');
});

test('not a sentence', () => {
    const alertMessage = checkInvalidText(',kdf, you are a fadkl.');
    expect(alertMessage).toBe('This is not a sentence!');
});

test('not a sentence2', () => {
    const alertMessage = checkInvalidText(',.....      :::][][].');
    expect(alertMessage).toBe('This is not a sentence!');
});

test('valid sentence', () => {
    const alertMessage = checkInvalidText('You are a good man hello');
    expect(alertMessage).toBe('');
});

test('valid sentence2', () => {
    const alertMessage = checkInvalidText('You are a good man\n, hello');
    expect(alertMessage).toBe('');
});


test('valid url', () =>{
    expect(checkUrl('http://www.example.com/wpstyle/?p=364')).toBe('');
    expect(checkUrl('http://foo.com/blah_blah')).toBe('');
    expect(checkUrl('https://foo.com/blah_blah')).toBe('');
});

test('invalid url', () =>{
    expect(checkUrl('file:///blah/index.html')).toBe('This is not a valid url!');
    expect(checkUrl('http://../')).toBe('This is not a valid url!');
    expect(checkUrl('http://foo.bar?q=Spaces should be encoded')).toBe('This is not a valid url!');
});
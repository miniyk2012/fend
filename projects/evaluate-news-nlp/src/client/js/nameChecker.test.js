const { checkInvalidText } = require('./nameChecker');


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
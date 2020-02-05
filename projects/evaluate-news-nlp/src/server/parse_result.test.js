const { sum, parse_elsa_result } = require('./parse_result');

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test('parse empty result', () => {
    console.log(parse_elsa_result);
    const entities = [];
    const result = parse_elsa_result(entities);
    expect(result).toEqual([]);
})

test('parse normal result', () => {
    
})
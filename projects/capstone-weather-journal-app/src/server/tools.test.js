const { geo_search } = require('./tools.js');


describe('api-test', () => {
    it('geo search', function () {
        return geo_search('china', 'shanghai').then(
            json => {
                expect(json.totalResultsCount).toBe(1);
                expect(json.geonames[0].name).toBe('上海市');
            }
        );
    });
});
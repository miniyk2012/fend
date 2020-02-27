const { geo_search, weather_forecast, pixabay_search } = require('./tools.js');


describe('api-test', () => {
    it('geo search', function () {
        return geo_search('china', 'shanghai').then(
            json => {
                expect(json.totalResultsCount).toBe(1);
                expect(json.geonames[0].name).toBe('上海市');
            }
        );
    });

    it('weather forecast', function () {
        return weather_forecast('31.22222', 121.45806, 1582764645).then(
            json => {
                expect(json).toHaveProperty('daily.data');
            }
        );
    });

    it('city photo', function() {
        return pixabay_search('america', 'new york').then(
            json => {
                expect(json).toHaveProperty('hits');
                expect(json.hits[0]).toHaveProperty('webformatURL');
            }
        );
    })
});
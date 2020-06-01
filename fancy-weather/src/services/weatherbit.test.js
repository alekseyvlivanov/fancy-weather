import APIDATA from './api-data';
import WeatherbitService from './weatherbit';

const weatherbitService = new WeatherbitService(APIDATA.Weatherbit);

describe('Weatherbit', () => {
  it('should return Current Weather', async () => {
    expect(weatherbitService.getCurrent).toBeDefined();

    const coords = { lat: 43.1056, lon: 131.874 };
    const lang = 'en';
    const city = 'Vladivostok';

    const current = await weatherbitService.getCurrent(coords, lang);

    expect(current).not.toBeNull();
    expect(current.data.length).toBeGreaterThan(0);
    expect(current.data[0].city_name).toEqual(city);
  });

  it('should return Forecast Weather', async () => {
    expect(weatherbitService.getForecast).toBeDefined();

    const coords = { lat: 43.1056, lon: 131.874 };
    const lang = 'en';
    const city = 'Vladivostok';

    const forecast = await weatherbitService.getForecast(coords, lang);

    expect(forecast).not.toBeNull();
    expect(forecast.data.length).toBeGreaterThan(0);
    expect(forecast.city_name).toEqual(city);
  });
});

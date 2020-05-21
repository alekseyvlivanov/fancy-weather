import Utils from './utils';

describe('Utils', () => {
  it('should return correct Celsius <-> Fahrenheit transforms', () => {
    expect(Utils.toCelsius).toBeDefined();
    expect(Utils.toFahrenheit).toBeDefined();
    expect(Utils.toCelsius(32)).toEqual(0);
    expect(Utils.toCelsius(-22)).toEqual(-30);
    expect(Utils.toCelsius(455)).toEqual(235);
    expect(Utils.toFahrenheit(0)).toEqual(32);
    expect(Utils.toFahrenheit(-30)).toEqual(-22);
    expect(Utils.toFahrenheit(235)).toEqual(455);
  });
});

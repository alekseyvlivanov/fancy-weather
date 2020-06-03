import { toCelsius, toFahrenheit } from './utils';

describe('Utils', () => {
  it('should return correct Celsius -> Fahrenheit transforms', () => {
    expect(toFahrenheit).toBeDefined();
    expect(toFahrenheit(0)).toEqual(32);
    expect(toFahrenheit(-30)).toEqual(-22);
    expect(toFahrenheit(235)).toEqual(455);
  });

  it('should return correct Fahrenheit -> Celsius transforms', () => {
    expect(toCelsius).toBeDefined();
    expect(toCelsius(32)).toEqual(0);
    expect(toCelsius(-22)).toEqual(-30);
    expect(toCelsius(455)).toEqual(235);
  });

  // TODO - getSeason tests

  // TODO - getPartOfDay tests
});

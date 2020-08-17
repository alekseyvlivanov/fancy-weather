import dayjs from 'dayjs';

import { toCelsius, toFahrenheit, getSeason, getPartOfDay } from './utils';

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

  it('should return correct Season', () => {
    const coordsNorth = { lat: 50, lon: 5 };
    const coordsSouth = { lat: -50, lon: 5 };

    const dayjsFebruary = dayjs(new Date(2020, 1, 6));
    const dayjsMarch = dayjs(new Date(2020, 2, 18));
    const dayjsJune = dayjs(new Date(2020, 5, 1));
    const dayjsOctober = dayjs(new Date(2020, 9, 31));

    expect(getSeason).toBeDefined();
    expect(getSeason(dayjsFebruary, coordsNorth)).toEqual('winter');
    expect(getSeason(dayjsFebruary, coordsSouth)).toEqual('summer');
    expect(getSeason(dayjsMarch, coordsNorth)).toEqual('spring');
    expect(getSeason(dayjsMarch, coordsSouth)).toEqual('autumn');
    expect(getSeason(dayjsJune, coordsNorth)).toEqual('summer');
    expect(getSeason(dayjsJune, coordsSouth)).toEqual('winter');
    expect(getSeason(dayjsOctober, coordsNorth)).toEqual('autumn');
    expect(getSeason(dayjsOctober, coordsSouth)).toEqual('spring');
  });

  it('should return correct Part of day', () => {
    const dayMorning = dayjs(new Date(2020, 6, 1, 8, 0, 0));
    const dayAfternoon = dayjs(new Date(2020, 6, 1, 13, 0, 0));
    const dayEvening = dayjs(new Date(2020, 6, 1, 20, 0, 0));
    const dayNight = dayjs(new Date(2020, 6, 1, 2, 0, 0));

    expect(getPartOfDay).toBeDefined();
    expect(getPartOfDay(dayMorning)).toEqual('morning');
    expect(getPartOfDay(dayAfternoon)).toEqual('afternoon');
    expect(getPartOfDay(dayEvening)).toEqual('evening');
    expect(getPartOfDay(dayNight)).toEqual('night');
  });
});

import { initValues } from '../utils';

export default class WeatherbitService {
  constructor(data) {
    this.apiBase = data.apiBase;
    this.apiKeys = data.apiKeys;
  }

  async getCurrent(coords, lang = initValues.lang) {
    const res = await fetch(
      `${this.apiBase}/current?key=${
        this.apiKeys[Math.round(Math.random())]
      }&lat=${coords.lat}&lon=${coords.lon}&lang=${lang}&units=M`,
    );

    if (!res.ok) {
      throw new Error(
        `Could not get Current weather for ${coords}. Received ${res.status}`,
      );
    }

    const json = await res.json();

    return json;
  }

  async getForecast(
    coords,
    lang = initValues.lang,
    degrees = initValues.degrees,
  ) {
    const res = await fetch(
      `${this.apiBase}/forecast/daily?key=${
        this.apiKeys[Math.round(Math.random())]
      }&lat=${coords.lat}&lon=${coords.lon}&lang=${lang}&units=M`,
    );

    if (!res.ok) {
      throw new Error(
        `Could not get Forecast weather for ${coords}. Received ${res.status}`,
      );
    }

    const json = await res.json();

    return json;
  }
}

import Utils from '../utils';

export default class WeatherbitService {
  constructor(data) {
    this.apiBase = data.apiBase;
    this.apiKey = data.apiKeys[1];
  }

  async getCurrent(
    coords,
    lang = Utils.initValues.lang,
    degrees = Utils.initValues.degrees,
  ) {
    const units = degrees === 'celcius' ? 'M' : 'F';

    const res = await fetch(
      `${this.apiBase}/current?key=${this.apiKey}&lat=${coords.lat}&lon=${coords.lon}&lang=${lang}&units=${units}`,
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
    days,
    lang = Utils.initValues.lang,
    degrees = Utils.initValues.degrees,
  ) {
    const units = degrees === 'celcius' ? 'M' : 'F';

    const res = await fetch(
      `${this.apiBase}/forecast/daily?key=${this.apiKey}&lat=${coords.lat}&lon=${coords.lon}&days=${days}&lang=${lang}&units=${units}`,
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

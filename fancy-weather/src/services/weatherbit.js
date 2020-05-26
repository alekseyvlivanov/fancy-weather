import Utils from '../utils';

export default class WeatherbitService {
  constructor(data) {
    this.apiBase = data.apiBase;
    this.apiKey = data.apiKey;
  }

  async getCurrent(
    lat,
    lon,
    lang = Utils.initValues.lang,
    degrees = Utils.initValues.degrees,
  ) {
    const units = degrees === 'celcius' ? 'M' : 'F';

    const res = await fetch(
      `${this.apiBase}/current?key=${this.apiKey}&lat=${lat}&lon=${lon}&lang=${lang}&units=${units}`,
    );

    if (!res.ok) {
      throw new Error(
        `Could not get Current weather for ${lat}, ${lon}. Received ${res.status}`,
      );
    }

    const json = await res.json();

    return json;
  }

  async getForecast(
    lat,
    lon,
    days,
    lang = Utils.initValues.lang,
    degrees = Utils.initValues.degrees,
  ) {
    const units = degrees === 'celcius' ? 'M' : 'F';

    const res = await fetch(
      `${this.apiBase}/forecast/daily?key=${this.apiKey}&lat=${lat}&lon=${lon}&days=${days}&lang=${lang}&units=${units}`,
    );

    if (!res.ok) {
      throw new Error(
        `Could not get Forecast weather for ${lat}, ${lon}. Received ${res.status}`,
      );
    }

    const json = await res.json();

    return json;
  }
}

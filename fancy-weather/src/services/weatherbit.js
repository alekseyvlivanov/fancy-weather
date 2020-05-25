import Utils from '../utils';

export default class WeatherbitService {
  constructor(data) {
    this.apiBaseCurrent = data.apiBaseCurrent;
    this.apiBaseForecast = data.apiBaseForecast;
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
      `${this.apiBaseCurrent}?key=${this.apiKey}&lat=${lat}&lon=${lon}&lang=${lang}&units=${units}`,
    );
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
      `${this.apiBaseForecast}?key=${this.apiKey}&lat=${lat}&lon=${lon}&days=${days}&lang=${lang}&units=${units}`,
    );
    const json = await res.json();

    return json;
  }
}

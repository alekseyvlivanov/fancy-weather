export default class HereService {
  constructor(data) {
    this.apiBase = data.apiBase;
    this.apiKey = data.apiKey;
  }

  async getGeoByPlace(lang, place) {
    const res = await fetch(
      encodeURI(
        `${this.apiBase}?apiKey=${this.apiKey}&lang=${lang}&q=${place}`,
      ),
    );

    if (!res.ok) {
      throw new Error(`Could not get Geo for ${place}. Received ${res.status}`);
    }

    const json = await res.json();

    return json;
  }
}

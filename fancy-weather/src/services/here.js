export default class HereService {
  constructor(data) {
    this.apiBaseGeocode = data.apiBaseGeocode;
    this.apiBaseRevgeocode = data.apiBaseRevgeocode;
    this.apiKey = data.apiKey;
  }

  async getGeoByPlace(lang, place) {
    const res = await fetch(
      encodeURI(
        `${this.apiBaseGeocode}?apiKey=${this.apiKey}&lang=${lang}&q=${place}`,
      ),
    );

    if (!res.ok) {
      throw new Error(`Could not get Geo for ${place}. Received ${res.status}`);
    }

    const json = await res.json();

    return json;
  }

  async getPlaceByGeo(lang, geo) {
    const res = await fetch(
      `${this.apiBaseRevgeocode}?apiKey=${this.apiKey}&lang=${lang}&at=${geo.lat},${geo.lon}`,
    );

    if (!res.ok) {
      throw new Error(
        `Could not get Place for ${geo.lat}, ${geo.lon}. Received ${res.status}`,
      );
    }

    const json = await res.json();

    return json;
  }
}

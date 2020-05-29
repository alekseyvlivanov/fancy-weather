export default class HereService {
  constructor(data) {
    this.apiBaseGeocode = data.apiBaseGeocode;
    this.apiBaseRevgeocode = data.apiBaseRevgeocode;
    this.apiBaseMapview = data.apiBaseMapview;
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

  async getMapByGeo(lang, geo) {
    const ml = lang === 'en' ? 'eng' : 'rus';

    const res = await fetch(
      `${this.apiBaseMapview}?apiKey=${this.apiKey}&c=${geo.lat},${geo.lon}&h=400&w=375&ml=${ml}&z=14&nocp`,
    );

    if (!res.ok) {
      throw new Error(
        `Could not get Map for ${geo.lat}, ${geo.lon}. Received ${res.status}`,
      );
    }

    const blob = await res.blob();

    return blob;
  }
}

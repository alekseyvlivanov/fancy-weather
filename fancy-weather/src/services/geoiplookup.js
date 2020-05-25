export default class GeoIPLookupService {
  constructor(data) {
    this.apiBase = data.apiBase;
  }

  async getGeo(ip) {
    const res = await fetch(`${this.apiBase}/${ip}`);
    const json = await res.json();

    return json;
  }
}

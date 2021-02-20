export default class GeoIPLookupService {
  constructor(data) {
    this.apiBase = data.apiBase;
  }

  async getGeoByIP(ip) {
    const res = await fetch(`${this.apiBase}/${ip}`, { mode: 'cors' });

    if (!res.ok) {
      throw new Error(`Could not get Geo for ${ip}. Received ${res.status}`);
    }

    const json = await res.json();

    return json;
  }
}

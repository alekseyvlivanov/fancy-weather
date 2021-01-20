export default class CloudflareService {
  constructor(data) {
    this.apiBase = data.apiBase;
    this.regexIP = /^ip=([0-9]+(.[0-9]+){3})$/m;
  }

  async getIP() {
    const res = await fetch(this.apiBase, { mode: 'cors' });

    if (!res.ok) {
      throw new Error(`Could not detect IP. Received ${res.status}`);
    }

    const text = await res.text();

    return text.match(this.regexIP)[1];
  }
}

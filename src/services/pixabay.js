export default class PixabayService {
  constructor(data) {
    this.apiBase = data.apiBase;
    this.apiKey = data.apiKey;
  }

  async getPhotos(text) {
    const res = await fetch(
      `${this.apiBase}/?key=${this.apiKey}&q=${encodeURIComponent(
        text,
      )}&image_type=photo&category=backgrounds`,
      { mode: 'cors' },
    );

    if (!res.ok) {
      throw new Error(
        `Could not get Photos for ${text}. Received ${res.status}`,
      );
    }

    const json = await res.json();

    return json;
  }
}

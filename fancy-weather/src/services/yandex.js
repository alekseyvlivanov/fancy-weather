export default class YandexService {
  constructor(data) {
    this.apiBase = data.apiBase;
    this.apiKey = data.apiKey;
  }

  async translate(text, lang) {
    const res = await fetch(
      encodeURI(
        `${this.apiBase}/translate?key=${this.apiKey}&text=${text}&lang=${lang}`,
      ),
    );

    if (!res.ok) {
      throw new Error(`Could not translate ${text}. Received ${res.status}`);
    }

    const json = await res.json();

    return json.text[0];
  }
}

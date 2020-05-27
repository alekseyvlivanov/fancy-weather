export default class YandexService {
  constructor(data) {
    this.apiBase = data.apiBase;
    this.apiKey = data.apiKey;
  }

  async translate(arr, lang) {
    const text = arr.map((e) => `&text=${e}`).join('');
    const res = await fetch(
      encodeURI(
        `${this.apiBase}/translate?key=${this.apiKey}${text}&lang=${lang}`,
      ),
    );

    if (!res.ok) {
      throw new Error(`Could not translate ${arr}. Received ${res.status}`);
    }

    const json = await res.json();

    return json.text;
  }
}

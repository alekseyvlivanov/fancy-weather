export default class MultiTranslateService {
  constructor(data) {
    this.apiBase = data.apiBase;
    this.corsProxy = 'https://cors-anywhere.herokuapp.com/';
  }

  async translate(arr, to, from) {
    try {
      const text = arr.join(', ');
      const res = await fetch(
        encodeURI(
          `${this.corsProxy}${this.apiBase}/translate?source_text=${text}&to_language=${to}&from_language=${from}`,
        ),
      );

      if (!res.ok) {
        throw new Error(`Could not translate ${arr}. Received ${res.status}`);
      }

      const json = await res.json();

      return json.translated_text.split(', ');
    } catch (err) {
      return arr;
    }
  }
}

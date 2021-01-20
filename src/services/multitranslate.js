export default class MultiTranslateService {
  constructor(data) {
    this.apiBase = data.apiBase;
  }

  async translate(arr, to, from) {
    try {
      const text = arr.join(', ');
      const res = await fetch(
        encodeURI(
          `${this.apiBase}/translate?source_text=${text}&to_language=${to}&from_language=${from}`,
        ),
        { mode: 'no-cors' },
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

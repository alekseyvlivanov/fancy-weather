const initValues = {
  lang: localStorage.getItem('lang') || 'en',
  degrees: localStorage.getItem('degrees') || 'celcius',
  coords: { lat: 43.1056, lon: 131.874 },
  timezone: 'Asia/Vladivostok',
  txt: {
    en: {
      refresh: 'Refresh background',
      input: 'Search city or ZIP',
      voice: 'Search by voice',
      search: 'Search',
      feels: 'Feels like',
      wind: 'Wind',
      ms: 'm/s',
      hum: 'Humidity',
      lat: 'Latitude',
      lon: 'Longitude',
    },
    ru: {
      refresh: 'Обновить фоновую картинку',
      input: 'Поиск города или индекса',
      voice: 'Голосовой поиск',
      search: 'Поиск',
      feels: 'Ощущается',
      wind: 'Ветер',
      ms: 'м/с',
      hum: 'Влажность',
      lat: 'Широта',
      lon: 'Долгота',
    },
    be: {
      refresh: 'Абнавіць фонавую карцінку',
      input: 'Пошук горада ці індэкса',
      voice: 'Галасавы пошук',
      search: 'Пошук',
      feels: 'Адчуваецца',
      wind: 'Вецер',
      ms: 'м/з',
      hum: 'Вільготнасць',
      lat: 'Шырата',
      lon: 'Даўгата',
    },
  },
};

function consoleInfo() {
  window.console.group();
  window.console.info('Уважаемый проверяющий!');
  window.console.info(
    'Если не работают fetch запросы - отключи блокировщик рекламы.',
  );
  window.console.info(
    'Большинство сервисов определения GEO/IP занесены в списки EasyList/EasyPrivacy.',
  );
  window.console.groupEnd();
}

function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

export default { initValues, consoleInfo, toCelsius, toFahrenheit };

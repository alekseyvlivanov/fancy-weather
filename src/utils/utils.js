const CONSTANTS = {
  langs: {
    en: 'en',
    ru: 'ru',
    be: 'be',
  },
  degrees: {
    celcius: 'celcius',
    fahrenheit: 'fahrenheit',
  },
};

const initValues = {
  lang: localStorage.getItem('lang') || CONSTANTS.langs.en,
  degrees: localStorage.getItem('degrees') || CONSTANTS.degrees.celcius,
  coords: { lat: 43.1056, lon: 131.874 },
  timezone: 'Asia/Vladivostok',
  textLabels: {
    en: {
      refresh: 'Refresh background',
      speak: 'Voice forecast',
      input: 'Search city or ZIP',
      voice: 'Search by voice',
      search: 'Search',
      feels: 'Feels like',
      wind: 'Wind',
      ms: 'm/s',
      mslong: 'meters per second',
      hum: 'Humidity',
      lat: 'Latitude',
      lon: 'Longitude',
      current: 'Current weather',
      forecast: 'Forecast weather',
    },
    ru: {
      refresh: 'Обновить фоновую картинку',
      speak: 'Озвучить прогноз',
      input: 'Поиск города или индекса',
      voice: 'Голосовой поиск',
      search: 'Поиск',
      feels: 'Ощущается',
      wind: 'Ветер',
      ms: 'м/с',
      mslong: 'метров в секунду',
      hum: 'Влажность',
      lat: 'Широта',
      lon: 'Долгота',
      current: 'Текущая погода',
      forecast: 'Прогноз погоды',
    },
    be: {
      refresh: 'Абнавіць фонавую карцінку',
      speak: 'Агучыць прагноз',
      input: 'Пошук горада ці індэкса',
      voice: 'Галасавы пошук',
      search: 'Пошук',
      feels: 'Адчуваецца',
      wind: 'Вецер',
      ms: 'м/с',
      mslong: 'метраў у секунду',
      hum: 'Вільготнасць',
      lat: 'Шырата',
      lon: 'Даўгата',
      current: "Бягучая надвор'е",
      forecast: "Прагноз надвор'я",
    },
  },
};

const voiceActions = {
  weather: 'weather',
  forecast: 'forecast',
  louder: 'louder',
  quieter: 'quieter',
};

const voiceCommands = {
  weather: voiceActions.weather,
  погода: voiceActions.weather,
  forecast: voiceActions.forecast,
  прогноз: voiceActions.forecast,
  louder: voiceActions.louder,
  громче: voiceActions.louder,
  quieter: voiceActions.quieter,
  тише: voiceActions.quieter,
};

function consoleInfo() {
  window.console.group();
  window.console.info('Уважаемый проверяющий!');
  window.console.info(
    'Если не работают fetch запросы - сперва отключи блокировщик рекламы, так как большинство сервисов определения GEO/IP занесены в списки EasyList/EasyPrivacy.',
  );
  window.console.info(
    'Замечу, что используемые бесплатные сервисы, мягко говоря, неидеальны при задании языка отличного от английского.',
  );
  window.console.info(
    'Погодный сервис Weatherbit может давать разные цифры для разных языков.',
  );
  window.console.info(
    'Геосервис Here для некоторых локаций отдает город на английском, а страну - на запрашиваемом языке. Также, он не умеет отображать карту на Белорусском, поэтому в этом случае используется русский язык.',
  );
  window.console.info(
    'Поиск по индексу работает не очень качественно. Если индекс дал какой то населенный пункт, рекомендую повторить поиск по этому названию.',
  );
  window.console.info(
    'Во время выполнения любых асинхронных запросов (крутится спиннер) кнопка обновления фона не блокируется. Это осознанное решение. Если протыкать туда несколько раз подряд - приложение постарается последовательно обновить фон столько же раз.',
  );
  window.console.info(
    'Если не срабатывает озвучка прогноза, попробуйте нажать кнопку еще раз. Зачитываемый текст выводится в консоль. Повторное нажатие кнопки в процессе озвучки - отменяет ее.',
  );
  window.console.info(
    'Голосовой поиск официально находится в экспериментальном статусе и не поддерживает Белорусский язык.',
  );
  window.console.info(
    'Распознаваемые команды: при активном Английском интерфейсе - weather, forecast, louder, quieter; при Русском и Белорусском - погода, прогноз, громче, тише. Все остальные фразы расцениваются как населенный пункт.',
  );
  window.console.info(
    'Реализованы все известные мне требования ТЗ. Если вы что то не обнаружили, свяжитесь со мной - я все поясню. Discord или Telegram: @alekseyvlivanov.',
  );
  window.console.groupEnd();
}

function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function getSeason(dayTime, coords) {
  let season;
  switch (dayTime.month()) {
    case 0:
    case 1:
    case 11:
      season = coords.lat > 0 ? 'winter' : 'summer';
      break;
    case 2:
    case 3:
    case 4:
      season = coords.lat > 0 ? 'spring' : 'autumn';
      break;
    case 5:
    case 6:
    case 7:
      season = coords.lat > 0 ? 'summer' : 'winter';
      break;
    case 8:
    case 9:
    case 10:
      season = coords.lat > 0 ? 'autumn' : 'spring';
      break;
    default:
      season = 'year';
  }
  return season;
}

function getPartOfDay(dayTime) {
  let partOfDay;
  switch (dayTime.hour()) {
    case 22:
    case 23:
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
      partOfDay = 'night';
      break;
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
      partOfDay = 'morning';
      break;
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
      partOfDay = 'afternoon';
      break;
    case 18:
    case 19:
    case 20:
    case 21:
      partOfDay = 'evening';
      break;
    default:
      partOfDay = 'day';
  }
  return partOfDay;
}

export {
  CONSTANTS,
  initValues,
  voiceActions,
  voiceCommands,
  consoleInfo,
  toCelsius,
  toFahrenheit,
  getSeason,
  getPartOfDay,
};

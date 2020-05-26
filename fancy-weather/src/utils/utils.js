const initValues = {
  lang: localStorage.getItem('lang') || 'en',
  degrees: localStorage.getItem('degrees') || 'celcius',
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

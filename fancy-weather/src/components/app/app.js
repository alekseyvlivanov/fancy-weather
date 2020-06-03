import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import 'dayjs/locale/be';
import 'notyf/notyf.min.css';
import NotyfContext from '../../notyf-context';

import Control from '../control';
import Search from '../search';
import Weather from '../weather';
import Maps from '../maps';
import Marquee from '../marquee';

import {
  CONSTANTS,
  initValues,
  consoleInfo,
  toFahrenheit,
  getSeason,
  getPartOfDay,
} from '../../utils';

import pixabay from '../../assets/pixabay.svg';

import './app.css';

import {
  apiKeyJS,
  cloudflareService,
  geoIPLookupService,
  hereService,
  pixabayService,
  weatherbitService,
  yandexService,
} from '../../services';

function App() {
  const notyf = useContext(NotyfContext);

  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState(initValues.lang);
  const [degrees, setDegrees] = useState(initValues.degrees);
  const [timezone, setTimezone] = useState(initValues.timezone);
  const [txt, setTxt] = useState(initValues.txt[lang]);

  const [dayTime, setDayTime] = useState(dayjs().locale(lang));
  const [dayTimeInterval, setDayTimeInterval] = useState(null);

  const [coords, setCoords] = useState({});
  const [placeFull, setPlaceFull] = useState({});
  const [place, setPlace] = useState({});
  const [weatherFull, setWeatherFull] = useState({});
  const [weather, setWeather] = useState({});
  const [photos, setPhotos] = useState({});

  function handleLoading() {
    setLoading(true);
    updateBackground();
  }

  function handleLang(value) {
    localStorage.setItem('lang', value);
    setLang(value);
    setPlace(placeFull[value]);
    updateTimer(value);
    setWeather(weatherFull[value]);
    setTxt(initValues.txt[value]);
  }

  function handleDegrees(value) {
    localStorage.setItem('degrees', value);
    setDegrees(value);
  }

  function handleSpeak() {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      return;
    }

    const current = weather.current.data[0];
    const forecast = [
      { dt: dayTime.add(1, 'day').format('dddd'), f: weather.forecast.data[1] },
      { dt: dayTime.add(2, 'day').format('dddd'), f: weather.forecast.data[2] },
      { dt: dayTime.add(3, 'day').format('dddd'), f: weather.forecast.data[3] },
    ];
    const speakLang = lang === CONSTANTS.langs.en ? lang : CONSTANTS.langs.ru;

    const txtCurrentWeather = `
    ${place.city} ${place.country}.
    ${lang === CONSTANTS.langs.en ? 'Current weather' : 'Текущая погода'}: ${
      degrees === 'celcius'
        ? current.temp.toLocaleString(speakLang, {
            maximumFractionDigits: 1,
          })
        : toFahrenheit(current.temp).toLocaleString(speakLang, {
            maximumFractionDigits: 1,
          })
    }°.
    ${current.weather.description}.
    ${txt.feels}: ${
      degrees === 'celcius'
        ? current.app_temp.toLocaleString(speakLang, {
            maximumFractionDigits: 1,
          })
        : toFahrenheit(current.app_temp).toLocaleString(speakLang, {
            maximumFractionDigits: 1,
          })
    }°.
    ${txt.wind}: ${current.wind_spd.toLocaleString(speakLang, {
      maximumFractionDigits: 1,
    })} ${
      lang === CONSTANTS.langs.en ? 'meters per second' : 'метров в секунду'
    }.
    ${txt.hum}: ${current.rh}%.
    `;

    const txtForecastWeather = `
    ${lang === CONSTANTS.langs.en ? 'Forecast weather' : 'Прогноз погоды'}.
    ${forecast
      .map((dtF) => {
        return `
      ${dtF.dt}.
      ${
        degrees === 'celcius'
          ? dtF.f.temp.toLocaleString(speakLang, {
              maximumFractionDigits: 1,
            })
          : toFahrenheit(dtF.f.temp).toLocaleString(speakLang, {
              maximumFractionDigits: 1,
            })
      }°.
      ${dtF.f.weather.description}.
      `;
      })
      .join('')}
    `;

    const utterance = new SpeechSynthesisUtterance();
    utterance.lang = lang === CONSTANTS.langs.en ? lang : CONSTANTS.langs.ru;

    utterance.text = txtCurrentWeather;
    window.console.log(txtCurrentWeather);
    speechSynthesis.speak(utterance);

    utterance.text = txtForecastWeather;
    window.console.log(txtForecastWeather);
    speechSynthesis.speak(utterance);
  }

  function handleSearch(value) {
    const term = value.trim();
    if (term.length > 0) {
      setLoading(true);

      hereService.getGeoByPlace(lang, term).then((geoByPlace) => {
        if (geoByPlace && geoByPlace.items.length > 0) {
          setCoords({
            lat: geoByPlace.items[0].position.lat,
            lon: geoByPlace.items[0].position.lng,
          });
        } else {
          notyf.error(`Found nothing for '${term}'`);
          setLoading(false);
        }
      });
    } else {
      notyf.error('Enter something to search');
    }
  }

  async function getPlaceByGeo(geo) {
    let res = null;

    const enPlace = await hereService.getPlaceByGeo('en', geo);
    const ruPlace = await hereService.getPlaceByGeo('ru', geo);

    if (enPlace.items.length && ruPlace.items.length) {
      res = {
        en: {
          city: enPlace.items[0].address.city,
          country: enPlace.items[0].address.countryName,
        },
        ru: {
          city: ruPlace.items[0].address.city,
          country: ruPlace.items[0].address.countryName,
        },
      };

      const resBe = await yandexService.translate(
        [ruPlace.items[0].address.city, ruPlace.items[0].address.countryName],
        'be',
      );

      res.be = resBe
        ? {
            city: resBe[0],
            country: resBe[1],
          }
        : res.ru;
    }

    return res;
  }

  function updateBackground() {
    if (Object.entries(photos).length === 0) {
      setLoading(false);
      return;
    }

    const newImage = new Image();
    newImage.onload = function () {
      document.body.style.backgroundImage = `
      linear-gradient(
        180deg,
        rgba(8, 15, 26, 0.59) 0%,
        rgba(17, 17, 46, 0.46) 100%
      ),
      url(${newImage.src})`;
      setLoading(false);
    };
    newImage.onerror = function () {
      notyf.error(`Couldn't load image from '${newImage.src}'`);
      setLoading(false);
    };
    newImage.src =
      photos.hits[Math.floor(Math.random() * photos.hits.length)].largeImageURL;
  }
  useEffect(updateBackground, [photos]);

  function updateTimer(value = lang) {
    clearInterval(dayTimeInterval);
    setDayTime(
      dayjs(
        new Date().toLocaleString(CONSTANTS.langs.en, {
          timeZone: timezone,
        }),
      ).locale(value),
    );
    setDayTimeInterval(
      setInterval(() => {
        setDayTime(
          dayjs(
            new Date().toLocaleString(CONSTANTS.langs.en, {
              timeZone: timezone,
            }),
          ).locale(value),
          1000,
        );
      }),
    );
  }
  useEffect(updateTimer, [timezone]);

  function updateApp() {
    if (Object.entries(coords).length === 0) return;

    async function getFullData() {
      const newPlace = await getPlaceByGeo(coords);

      if (newPlace) {
        notyf.success(
          `Found: ${newPlace[lang].city}, ${newPlace[lang].country}`,
        );

        const enCurrent = await weatherbitService.getCurrent(coords, 'en');
        const ruCurrent = await weatherbitService.getCurrent(coords, 'ru');
        const beCurrent = await weatherbitService.getCurrent(coords, 'be');

        const enForecast = await weatherbitService.getForecast(coords, 'en');
        const ruForecast = await weatherbitService.getForecast(coords, 'ru');
        const beForecast = await weatherbitService.getForecast(coords, 'be');

        if (
          enCurrent &&
          ruCurrent &&
          beCurrent &&
          enForecast &&
          ruForecast &&
          beForecast
        ) {
          const newWeather = {
            en: {
              current: enCurrent,
              forecast: enForecast,
            },
            ru: {
              current: ruCurrent,
              forecast: ruForecast,
            },
            be: {
              current: beCurrent,
              forecast: beForecast,
            },
          };

          setPlaceFull(newPlace);
          setPlace(newPlace[lang]);

          setWeatherFull(newWeather);
          setWeather(newWeather[lang]);

          setTimezone(enCurrent.data[0].timezone);

          const season = getSeason(dayTime, coords);
          const partOfDay = getPartOfDay(dayTime);

          window.console.log(`Pixabay search: '${season} ${partOfDay}'`);
          const newPhotos = await pixabayService.getPhotos(
            `${season} ${partOfDay}`,
          );
          setPhotos(newPhotos);
        }
      } else {
        notyf.error(
          `Couldn't determine Place by Geo: ${coords.lat}, ${coords.lon}`,
        );
      }

      return;
    }
    getFullData();
  }
  useEffect(updateApp, [coords]);

  function initApp() {
    async function getInitialGeo() {
      consoleInfo();

      const ip = await cloudflareService.getIP();
      if (!ip) {
        notyf.error("Couldn't determine your IP - using default Geo data");
        return null;
      }
      notyf.success(`Your IP: ${ip}`);

      const geoByIP = await geoIPLookupService.getGeoByIP(ip);
      if (!geoByIP) {
        notyf.error("Couldn't determine your Geo by IP - using default");
        return null;
      }

      return geoByIP;
    }
    getInitialGeo().then((geoByIP) => {
      setCoords(
        geoByIP
          ? { lat: geoByIP.latitude, lon: geoByIP.longitude }
          : initValues.coords,
      );
    });

    notyf.success("Don't forget to check the Chrome DevTools console");
  }
  useEffect(initApp, []);

  return Object.entries(weather).length > 0 ? (
    <React.Fragment>
      <div className="app">
        <div className="app-header">
          <Control
            txtRefresh={txt.refresh}
            txtSpeak={txt.speak}
            loading={loading}
            handleLoading={handleLoading}
            lang={lang}
            handleLang={handleLang}
            degrees={degrees}
            handleDegrees={handleDegrees}
            handleSpeak={handleSpeak}
          />
          <Search
            degrees={degrees}
            place={place}
            dtF1={dayTime.add(1, 'day').format('dddd')}
            dtF2={dayTime.add(2, 'day').format('dddd')}
            dtF3={dayTime.add(3, 'day').format('dddd')}
            weather={weather}
            txtFeels={txt.feels}
            txtWind={txt.wind}
            txtMs={
              lang === CONSTANTS.langs.en
                ? 'meters per second'
                : 'метров в секунду'
            }
            txtHum={txt.hum}
            txtInput={txt.input}
            txtVoice={txt.voice}
            txtSearch={txt.search}
            lang={lang}
            handleSearch={handleSearch}
          />
        </div>

        <div className="app-main">
          <Weather
            degrees={degrees}
            place={place}
            dtDay={dayTime.format('ddd D MMM')}
            dtTime={dayTime.format('HH:mm:ss')}
            dtF1={dayTime.add(1, 'day').format('dddd')}
            dtF2={dayTime.add(2, 'day').format('dddd')}
            dtF3={dayTime.add(3, 'day').format('dddd')}
            weather={weather}
            txtFeels={txt.feels}
            txtWind={txt.wind}
            txtMs={txt.ms}
            txtHum={txt.hum}
          />
          <Maps
            txtLat={txt.lat}
            txtLon={txt.lon}
            apiKeyJS={apiKeyJS}
            coords={coords}
            lang={lang}
          />
        </div>
      </div>

      <div className="app-footer">
        <Marquee
          degrees={degrees}
          weather={weather}
          txtWind={txt.wind}
          txtMs={txt.ms}
          txtHum={txt.hum}
        />
      </div>

      <a
        href="https://pixabay.com/"
        alt="pixabay"
        rel="noopener noreferrer"
        target="_blank"
      >
        <img className="pixabay" src={pixabay} alt="pixabay" />
      </a>
    </React.Fragment>
  ) : null;
}

export default App;

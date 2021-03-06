import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import 'dayjs/locale/be';
import Loader from 'react-loader-spinner';

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
  voiceActions,
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
  multiTranslateService,
  pixabayService,
  weatherbitService,
} from '../../services';

function App() {
  const notyf = useContext(NotyfContext);

  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState(initValues.lang);
  const [degrees, setDegrees] = useState(initValues.degrees);
  const [timezone, setTimezone] = useState(initValues.timezone);
  const [textLabels, setTextLabels] = useState(initValues.textLabels[lang]);

  const [dayTime, setDayTime] = useState(dayjs().locale(lang));
  const [dayTimeInterval, setDayTimeInterval] = useState(null);

  const [coords, setCoords] = useState({});
  const [placeFull, setPlaceFull] = useState({});
  const [place, setPlace] = useState({});
  const [weatherFull, setWeatherFull] = useState({});
  const [weather, setWeather] = useState({});
  const [photos, setPhotos] = useState({});

  function handleDegrees(value) {
    localStorage.setItem('degrees', value);
    setDegrees(value);
  }

  function handleLang(value) {
    localStorage.setItem('lang', value);
    setLang(value);
    setPlace(placeFull[value]);
    updateTimer(value);
    setWeather(weatherFull[value]);
    setTextLabels(initValues.textLabels[value]);
  }

  function handleLoading() {
    setLoading(true);
    updateBackground();
  }

  function handleSpeak(volume = 0.5, mode) {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      return;
    }

    const speakLang = lang === CONSTANTS.langs.en ? lang : CONSTANTS.langs.ru;

    const utterance = new SpeechSynthesisUtterance();
    utterance.lang = speakLang;
    utterance.volume = volume;

    if (!mode || mode === voiceActions.weather) {
      const currentWeather = weather.current.data[0];

      const textCurrentWeather = `
      ${place.city}, ${place.country}.
      ${textLabels.current}: ${
        degrees === CONSTANTS.degrees.celcius
          ? currentWeather.temp.toLocaleString(speakLang, {
              maximumFractionDigits: 1,
            })
          : toFahrenheit(currentWeather.temp).toLocaleString(speakLang, {
              maximumFractionDigits: 1,
            })
      }°.
      ${currentWeather.weather.description}.
      ${textLabels.feels}: ${
        degrees === CONSTANTS.degrees.celcius
          ? currentWeather.app_temp.toLocaleString(speakLang, {
              maximumFractionDigits: 1,
            })
          : toFahrenheit(currentWeather.app_temp).toLocaleString(speakLang, {
              maximumFractionDigits: 1,
            })
      }°.
      ${textLabels.wind}: ${currentWeather.wind_spd.toLocaleString(speakLang, {
        maximumFractionDigits: 1,
      })} ${textLabels.mslong}.
      ${textLabels.hum}: ${currentWeather.rh}%.
      `;

      utterance.text = textCurrentWeather;
      window.console.log(textCurrentWeather);
      speechSynthesis.speak(utterance);
    }

    if (!mode || mode === voiceActions.forecast) {
      const forecastWeather = weather.forecast.data;

      const forecastDays = [
        forecastWeather[1],
        forecastWeather[2],
        forecastWeather[3],
      ]
        .map((dayForecast, idx) => {
          return `
      ${dayTime.add(idx, 'day').format('dddd')}.
      ${
        degrees === CONSTANTS.degrees.celcius
          ? dayForecast.temp.toLocaleString(speakLang, {
              maximumFractionDigits: 1,
            })
          : toFahrenheit(dayForecast.temp).toLocaleString(speakLang, {
              maximumFractionDigits: 1,
            })
      }°.
      ${dayForecast.weather.description}.
      `;
        })
        .join('');

      const textForecastWeather = `
      ${place.city}, ${place.country}.
      ${textLabels.forecast}.
      ${forecastDays}
      `;

      utterance.text = textForecastWeather;
      window.console.log(textForecastWeather);
      speechSynthesis.speak(utterance);
    }
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
    let place = null;

    const placeInEnglish = await hereService.getPlaceByGeo(
      CONSTANTS.langs.en,
      geo,
    );
    const placeInRussian = await hereService.getPlaceByGeo(
      CONSTANTS.langs.ru,
      geo,
    );

    if (placeInEnglish.items.length && placeInRussian.items.length) {
      place = {
        en: {
          city: placeInEnglish.items[0].address.city,
          country: placeInEnglish.items[0].address.countryName,
        },
        ru: {
          city: placeInRussian.items[0].address.city,
          country: placeInRussian.items[0].address.countryName,
        },
      };

      const placeInBelorussian = await multiTranslateService.translate(
        [
          placeInRussian.items[0].address.city,
          placeInRussian.items[0].address.countryName,
        ],
        CONSTANTS.langs.be,
        CONSTANTS.langs.ru,
      );

      place.be = placeInBelorussian
        ? {
            city: placeInBelorussian[0],
            country: placeInBelorussian[1],
          }
        : place.ru;
    }

    return place;
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

        const enCurrentWeather = await weatherbitService.getCurrent(
          coords,
          CONSTANTS.langs.en,
        );
        const ruCurrentWeather = await weatherbitService.getCurrent(
          coords,
          CONSTANTS.langs.ru,
        );
        const beCurrentWeather = await weatherbitService.getCurrent(
          coords,
          CONSTANTS.langs.be,
        );

        const enForecastWeather = await weatherbitService.getForecast(
          coords,
          CONSTANTS.langs.en,
        );
        const ruForecastWeather = await weatherbitService.getForecast(
          coords,
          CONSTANTS.langs.ru,
        );
        const beForecastWeather = await weatherbitService.getForecast(
          coords,
          CONSTANTS.langs.be,
        );

        if (
          enCurrentWeather &&
          ruCurrentWeather &&
          beCurrentWeather &&
          enForecastWeather &&
          ruForecastWeather &&
          beForecastWeather
        ) {
          const newWeather = {
            en: {
              current: enCurrentWeather,
              forecast: enForecastWeather,
            },
            ru: {
              current: ruCurrentWeather,
              forecast: ruForecastWeather,
            },
            be: {
              current: beCurrentWeather,
              forecast: beForecastWeather,
            },
          };

          const season = getSeason(dayTime, coords);
          const partOfDay = getPartOfDay(dayTime);

          const newPhotos = await pixabayService.getPhotos(
            `${season} ${partOfDay}`,
          );

          setPhotos(newPhotos);

          setPlaceFull(newPlace);
          setPlace(newPlace[lang]);

          setWeatherFull(newWeather);
          setWeather(newWeather[lang]);

          setTimezone(enCurrentWeather.data[0].timezone);
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
    async function getGeoByIP() {
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

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => {
        getGeoByIP().then((geo) => {
          setCoords(
            geo ? { lat: geo.latitude, lon: geo.longitude } : initValues.coords,
          );
        });
      },
    );
  }
  useEffect(initApp, []);

  return Object.entries(weather).length > 0 ? (
    <>
      <div className="app">
        <div className="app-header">
          <Control
            degrees={degrees}
            lang={lang}
            loading={loading}
            textLabels={textLabels}
            handleDegrees={handleDegrees}
            handleLang={handleLang}
            handleLoading={handleLoading}
            handleSpeak={handleSpeak}
          />
          <Search
            degrees={degrees}
            lang={lang}
            place={place}
            textLabels={textLabels}
            handleSearch={handleSearch}
            handleSpeak={handleSpeak}
          />
        </div>

        <div className="app-main">
          <Weather
            dayTime={dayTime}
            degrees={degrees}
            place={place}
            textLabels={textLabels}
            weather={weather}
          />
          <Maps
            apiKeyJS={apiKeyJS}
            coords={coords}
            lang={lang}
            textLabels={textLabels}
          />
        </div>
      </div>

      <div className="app-footer">
        <Marquee degrees={degrees} textLabels={textLabels} weather={weather} />
      </div>

      <a
        href="https://pixabay.com/"
        alt="pixabay"
        rel="noopener noreferrer"
        target="_blank"
      >
        <img className="pixabay" src={pixabay} alt="pixabay" />
      </a>
    </>
  ) : (
    <div className="app">
      <div className="app-main">
        <Loader type="Grid" color="white" height={100} width={100} />
      </div>
    </div>
  );
}

export default App;

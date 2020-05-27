import React from 'react';

import Control from '../control';
import Search from '../search';
import Weather from '../weather';
import Maps from '../maps';
import Marquee from '../marquee';

import Utils from '../../utils';

import pixabay from '../../assets/pixabay.svg';

import './app.css';

import APIDATA from '../../services/api-data';
import CloudflareService from '../../services/cloudflare';
import GeoIPLookupService from '../../services/geoiplookup';
import HereService from '../../services/here';
import WeatherbitService from '../../services/weatherbit';
import YandexService from '../../services/yandex';

function App() {
  const cloudflareService = new CloudflareService(APIDATA.Cloudflare);
  const geoIPLookupService = new GeoIPLookupService(APIDATA.GeoIPLookup);
  const hereService = new HereService(APIDATA.Here);
  const weatherbitService = new WeatherbitService(APIDATA.Weatherbit);
  const yandexService = new YandexService(APIDATA.Yandex);

  const [loading, setLoading] = React.useState(true);
  const [lang, setLang] = React.useState(Utils.initValues.lang);
  const [degrees, setDegrees] = React.useState(Utils.initValues.degrees);
  const [txt, setTxt] = React.useState(Utils.initValues.txt[lang]);

  const [coords, setCoords] = React.useState({});
  const [placeFull, setPlaceFull] = React.useState({});
  const [place, setPlace] = React.useState({});
  const [weatherFull, setWeatherFull] = React.useState({});
  const [weather, setWeather] = React.useState({});

  function cbLoading(value) {
    // TODO refresh background
    setLoading(value);
  }

  function cbLang(value) {
    localStorage.setItem('lang', value);
    setLang(value);
    setPlace(placeFull[value]);
    setWeather(weatherFull[value]);
    setTxt(Utils.initValues.txt[value]);
  }

  function cbDegrees(value) {
    localStorage.setItem('degrees', value);
    setDegrees(value);
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

  function initApp() {
    async function getInitialGeo() {
      Utils.consoleInfo();

      const ip = await cloudflareService.getIP();
      if (!ip) return null;

      const geoByIP = await geoIPLookupService.getGeoByIP(ip);
      if (!geoByIP) return null;

      return geoByIP;
    }
    getInitialGeo().then((geoByIP) => {
      setCoords(
        geoByIP
          ? { lat: geoByIP.latitude, lon: geoByIP.longitude }
          : Utils.initValues.coords,
      );
    });
  }

  React.useEffect(initApp, []);

  function updateApp() {
    if (Object.entries(coords).length === 0) return;

    setLoading(true);

    async function getFullData() {
      const newPlace = await getPlaceByGeo(coords);

      if (newPlace) {
        const enCurrent = await weatherbitService.getCurrent(
          coords,
          'en',
          degrees,
        );
        const ruCurrent = await weatherbitService.getCurrent(
          coords,
          'ru',
          degrees,
        );
        const beCurrent = await weatherbitService.getCurrent(
          coords,
          'be',
          degrees,
        );

        const enForecast = await weatherbitService.getForecast(
          coords,
          3,
          'en',
          degrees,
        );
        const ruForecast = await weatherbitService.getForecast(
          coords,
          3,
          'ru',
          degrees,
        );
        const beForecast = await weatherbitService.getForecast(
          coords,
          3,
          'be',
          degrees,
        );

        if (
          enCurrent &&
          ruCurrent &&
          beCurrent &&
          enForecast &&
          ruForecast &&
          beForecast
        ) {
          setPlaceFull(newPlace);
          setPlace(newPlace[lang]);

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

          setWeatherFull(newWeather);
          setWeather(newWeather[lang]);
        }
      } else {
        window.console.group();
        window.console.warn("Can't fetch data!");
        window.console.warn('Check Network tab in the Developer Tools.');
        window.console.groupEnd();
      }

      return;
    }
    getFullData()
      .then()
      .finally(() => {
        setLoading(false);
      });
  }

  React.useEffect(updateApp, [coords]);

  return (
    <React.Fragment>
      <div className="app">
        <div className="app-header">
          <Control
            txtRefresh={txt.refresh}
            loading={loading}
            cbLoading={cbLoading}
            lang={lang}
            cbLang={cbLang}
            degrees={degrees}
            cbDegrees={cbDegrees}
          />
          <Search
            txtInput={txt.input}
            txtVoice={txt.voice}
            txtSearch={txt.search}
          />
        </div>
        <div className="app-main">
          {Object.entries(weather).length > 0 ? (
            <Weather
              place={place}
              weather={weather}
              txtFeels={txt.feels}
              txtWind={txt.wind}
              txtMs={txt.ms}
              txtHum={txt.hum}
            />
          ) : null}
          <Maps txtLat={txt.lat} txtLon={txt.lon} coords={coords} />
        </div>
      </div>
      <div className="app-footer">
        <Marquee />
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
  );
}

export default App;

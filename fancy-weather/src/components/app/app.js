import React from 'react';
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

import Utils from '../../utils';

import pixabay from '../../assets/pixabay.svg';

import './app.css';

import APIDATA from '../../services/api-data';
import CloudflareService from '../../services/cloudflare';
import GeoIPLookupService from '../../services/geoiplookup';
import HereService from '../../services/here';
import PixabayService from '../../services/pixabay';
import WeatherbitService from '../../services/weatherbit';
import YandexService from '../../services/yandex';

function App() {
  const notyf = React.useContext(NotyfContext);

  const cloudflareService = new CloudflareService(APIDATA.Cloudflare);
  const geoIPLookupService = new GeoIPLookupService(APIDATA.GeoIPLookup);
  const hereService = new HereService(APIDATA.Here);
  const pixabayService = new PixabayService(APIDATA.Pixabay);
  const weatherbitService = new WeatherbitService(APIDATA.Weatherbit);
  const yandexService = new YandexService(APIDATA.Yandex);

  const [loading, setLoading] = React.useState(true);
  const [lang, setLang] = React.useState(Utils.initValues.lang);
  const [degrees, setDegrees] = React.useState(Utils.initValues.degrees);
  const [timezone, setTimezone] = React.useState(Utils.initValues.timezone);
  const [txt, setTxt] = React.useState(Utils.initValues.txt[lang]);

  const [dayTime, setDayTime] = React.useState(dayjs().locale(lang));
  const [dayTimeInterval, setDayTimeInterval] = React.useState(null);

  const [coords, setCoords] = React.useState({});
  const [placeFull, setPlaceFull] = React.useState({});
  const [place, setPlace] = React.useState({});
  const [weatherFull, setWeatherFull] = React.useState({});
  const [weather, setWeather] = React.useState({});
  const [photos, setPhotos] = React.useState({});

  function cbLoading() {
    setLoading(true);
    updateBackground();
  }

  function cbLang(value) {
    localStorage.setItem('lang', value);
    setLang(value);
    setPlace(placeFull[value]);
    updateTimer(value);
    setWeather(weatherFull[value]);
    setTxt(Utils.initValues.txt[value]);
  }

  function cbDegrees(value) {
    localStorage.setItem('degrees', value);
    setDegrees(value);
  }

  function cbSearch(value) {
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
  React.useEffect(updateBackground, [photos]);

  function updateTimer(value = lang) {
    clearInterval(dayTimeInterval);
    setDayTime(
      dayjs(
        new Date().toLocaleString('en-US', {
          timeZone: timezone,
        }),
      ).locale(value),
    );
    setDayTimeInterval(
      setInterval(() => {
        setDayTime(
          dayjs(
            new Date().toLocaleString('en-US', {
              timeZone: timezone,
            }),
          ).locale(value),
          1000,
        );
      }),
    );
  }
  React.useEffect(updateTimer, [timezone]);

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

          let season;
          switch (dayTime.month()) {
            case 0:
            case 1:
            case 11:
              season = 'winter';
              break;
            case 2:
            case 3:
            case 4:
              season = 'spring';
              break;
            case 5:
            case 6:
            case 7:
              season = 'summer';
              break;
            case 8:
            case 9:
            case 10:
              season = 'autumn';
              break;
            default:
              season = 'year';
          }

          let pod;
          switch (dayTime.hour()) {
            case 22:
            case 23:
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
              pod = 'night';
              break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
              pod = 'morning';
              break;
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
              pod = 'afternoon';
              break;
            case 18:
            case 19:
            case 20:
            case 21:
              pod = 'evening';
              break;
            default:
              pod = 'day';
          }

          const newPhotos = await pixabayService.getPhotos(`${season} ${pod}`);
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
  React.useEffect(updateApp, [coords]);

  function initApp() {
    async function getInitialGeo() {
      Utils.consoleInfo();

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
          : Utils.initValues.coords,
      );
    });
  }
  React.useEffect(initApp, []);

  return Object.entries(weather).length > 0 ? (
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
            cbSearch={cbSearch}
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
            apiKeyJS={APIDATA.Here.apiKeyJS}
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

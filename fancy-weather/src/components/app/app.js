import React from 'react';

import Control from '../control';
import Search from '../search';
import Weather from '../weather';
import Maps from '../maps';
import Marquee from '../marquee';

import Utils from '../../utils';

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

  // Main data object
  const obj = { place: Utils.initValues.place };

  const [loading, setLoading] = React.useState(true);
  const [lang, setLang] = React.useState(Utils.initValues.lang);
  const [degrees, setDegrees] = React.useState(Utils.initValues.degrees);
  const [place, setPlace] = React.useState(obj.place[lang]);
  const [coords, setCoords] = React.useState(Utils.initValues.coords);
  const [txt, setTxt] = React.useState(Utils.initValues.txt[lang]);

  function cbLoading(value) {
    setLoading(value);
  }

  function cbLang(value) {
    localStorage.setItem('lang', value);
    setLang(value);
    setPlace(obj.place[value]);
    setTxt(Utils.initValues.txt[value]);
  }

  function cbDegrees(value) {
    localStorage.setItem('degrees', value);
    setDegrees(value);
  }

  function cbPlace(value) {
    setPlace(value);
  }

  function cbCoords(value) {
    setCoords(value);
  }

  React.useEffect(() => {
    async function fetchData() {
      // const ip = await cloudflareService.getIP();

      // window.console.log(ip);

      // const geoByIP = await geoIPLookupService.getGeoByIP(ip);

      // window.console.log(`${geoByIP.city}, ${geoByIP.country_name}`);
      // window.console.log(`latitude: ${geoByIP.latitude}`);
      // window.console.log(`longitude: ${geoByIP.longitude}`);
      // window.console.log(`timezone_name: ${geoByIP.timezone_name}`);

      // const current = await weatherbitService.getCurrent(
      //   geoByIP.latitude,
      //   geoByIP.longitude,
      //   lang,
      //   degrees,
      // );
      // const forecast = await weatherbitService.getForecast(
      //   geoByIP.latitude,
      //   geoByIP.longitude,
      //   3,
      //   lang,
      //   degrees,
      // );

      // window.console.log(current);
      // window.console.log(forecast);

      // const geoByPlace = await hereService.getGeoByPlace(lang, place.city);

      // window.console.log(geoByPlace);

      setLoading(false);
    }

    Utils.consoleInfo();
    fetchData();
  }, []);

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
          <Weather
            place={place}
            txtFeels={txt.feels}
            txtWind={txt.wind}
            txtHum={txt.hum}
          />
          <Maps txtLat={txt.lat} txtLon={txt.lon} coords={coords} />
        </div>
      </div>
      <div className="app-footer">
        <Marquee />
      </div>
    </React.Fragment>
  );
}

export default App;

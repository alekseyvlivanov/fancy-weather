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
import WeatherbitService from '../../services/weatherbit';

function App() {
  const [loading, setLoading] = React.useState(true);
  const [lang, setLang] = React.useState(Utils.initValues.lang);
  const [degrees, setDegrees] = React.useState(Utils.initValues.degrees);

  function cbLoading(value) {
    setLoading(value);
  }

  function cbLang(value) {
    setLang(value);
  }

  function cbDegrees(value) {
    setDegrees(value);
  }

  React.useEffect(() => {
    Utils.consoleInfo();
  }, []);

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const cloudflareService = new CloudflareService(APIDATA.Cloudflare);
      const ip = await cloudflareService.getIP();

      window.console.log(ip);

      const geoIPLookupService = new GeoIPLookupService(APIDATA.GeoIPLookup);
      const geo = await geoIPLookupService.getGeo(ip);

      window.console.log(`${geo.city}, ${geo.country_name}`);
      window.console.log(`latitude: ${geo.latitude}`);
      window.console.log(`longitude: ${geo.longitude}`);
      window.console.log(`timezone_name: ${geo.timezone_name}`);

      const weatherbitService = new WeatherbitService(APIDATA.Weatherbit);
      const current = await weatherbitService.getCurrent(
        geo.latitude,
        geo.longitude,
        lang,
        degrees,
      );
      const forecast = await weatherbitService.getForecast(
        geo.latitude,
        geo.longitude,
        3,
        lang,
        degrees,
      );

      window.console.log(current);
      window.console.log(forecast);

      setLoading(false);
    }
    fetchData();
  }, [lang, degrees]);

  return (
    <React.Fragment>
      <div className="app">
        <div className="app-header">
          <Control
            loading={loading}
            cbLoading={cbLoading}
            lang={lang}
            cbLang={cbLang}
            degrees={degrees}
            cbDegrees={cbDegrees}
          />
          <Search />
        </div>
        <div className="app-main">
          <Weather />
          <Maps />
        </div>
      </div>
      <div className="app-footer">
        <Marquee />
      </div>
    </React.Fragment>
  );
}

export default App;

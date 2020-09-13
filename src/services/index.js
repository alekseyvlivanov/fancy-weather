import APIDATA from './api-data';
import CloudflareService from './cloudflare';
import GeoIPLookupService from './geoiplookup';
import HereService from './here';
import MultiTranslateService from './multitranslate';
import PixabayService from './pixabay';
import WeatherbitService from './weatherbit';

const apiKeyJS = APIDATA.Here.apiKeyJS;

const cloudflareService = new CloudflareService(APIDATA.Cloudflare);
const geoIPLookupService = new GeoIPLookupService(APIDATA.GeoIPLookup);
const hereService = new HereService(APIDATA.Here);
const multiTranslateService = new MultiTranslateService(APIDATA.MultiTranslate);
const pixabayService = new PixabayService(APIDATA.Pixabay);
const weatherbitService = new WeatherbitService(APIDATA.Weatherbit);

export {
  apiKeyJS,
  cloudflareService,
  geoIPLookupService,
  hereService,
  multiTranslateService,
  pixabayService,
  weatherbitService,
};

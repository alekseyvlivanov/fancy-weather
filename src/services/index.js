import APIDATA from './api-data';
import CloudflareService from './cloudflare';
import GeoIPLookupService from './geoiplookup';
import HereService from './here';
import PixabayService from './pixabay';
import WeatherbitService from './weatherbit';
import YandexService from './yandex';

const apiKeyJS = APIDATA.Here.apiKeyJS;

const cloudflareService = new CloudflareService(APIDATA.Cloudflare);
const geoIPLookupService = new GeoIPLookupService(APIDATA.GeoIPLookup);
const hereService = new HereService(APIDATA.Here);
const pixabayService = new PixabayService(APIDATA.Pixabay);
const weatherbitService = new WeatherbitService(APIDATA.Weatherbit);
const yandexService = new YandexService(APIDATA.Yandex);

export {
  apiKeyJS,
  cloudflareService,
  geoIPLookupService,
  hereService,
  pixabayService,
  weatherbitService,
  yandexService,
};

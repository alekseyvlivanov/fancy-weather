# Fancy Weather

## Overview

This is a React SPA for weather forecast.

#### DEMO - https://fancy-weather.chessiah.com

[![Netlify Status](https://api.netlify.com/api/v1/badges/79bb1a2b-a972-4375-8ce9-8c2490531847/deploy-status)](https://app.netlify.com/sites/fancy-weather-chessiah/deploys)

<div align="center">
<img src="https://user-images.githubusercontent.com/14129152/83372284-39860700-a408-11ea-9ee0-448e4c415a9b.png" width="640px">
</div>

## Features

- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) is used to retrieve the devices's current location at the start
- if the location retrieval is unsuccessful the app uses [Cloudflare](https://www.cloudflare.com/cdn-cgi/trace) to detect IP and [GeoIPLookup API](https://geoiplookup.io/api) for IP to Geo coordinates transform
- [HERE API](https://developer.here.com/develop/javascript-api) is used to display interactive map with marker and also to search the place by name or index
- all weather data are fetched using [Weatherbit API](https://www.weatherbit.io/api)
- English/Russian/Belorussian interface and weather data
- HERE service doesn't support Belorussian so in these case the place name translates with [Multi-Translate](https://multi-translate.rekon.uk) [public API](https://multi-translate-public-api.rekon.uk/docs)
- [Pixabay API](https://pixabay.com/api/docs/) is used for nice backgrounds according to the current place's season and part of the day
- you can enable/disable voice control by tapping microphone icon
- SpeechRecognition and SpeechSynthesis are used from [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- use these commands in English interface:
  - weather, forecast, louder, quieter
- use these commands in Russian/Belorussian interface:
  - погода, прогноз, громче, тише
- all other phrases are considered as places with instant searching
- animated weather icons
- Celsius/Fahrenheit conversion
- css unrectangular mask is applied to the map
- scrolling weather data at the bottom at medium(+) screens
- unit tests with Jest

## Dependencies

- React plus hooks bootstrapped with CRA
- [Day.js](https://day.js.org) for timezone calculation
- [Notyf](https://carlosroso.com/notyf/) for toast notifications

## Install

```
$ git clone ...
$ cd fancy-weather
$ npm install
```

## Usage

```
$ npm run start
```

and open http://localhost:3000 in your browser, or

```
$ npm run build
```

and deploy somewhere your new **build** folder.

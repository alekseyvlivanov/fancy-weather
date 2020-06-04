import React from 'react';

import { toFahrenheit } from '../../utils';

import './weather.css';

function Weather(props) {
  const { dayTime, degrees, place, textLabels, weather } = props;

  const currentWeather = weather.current.data[0];
  const forecastWeather = weather.forecast.data;

  const forecastDays = [
    forecastWeather[1],
    forecastWeather[2],
    forecastWeather[3],
  ].map((dayForecast, idx) => {
    return (
      <div key={idx} className="weather-day">
        <h5>{dayTime.add(idx, 'day').format('dddd')}</h5>
        <div className="day-summary">
          <span>
            {degrees === 'celcius'
              ? dayForecast.temp.toFixed(1)
              : toFahrenheit(dayForecast.temp).toFixed(1)}
            °
          </span>
          <img
            className="day-icon"
            src={`../assets/${dayForecast.weather.icon}.svg`}
            alt="day icon"
          />
        </div>
      </div>
    );
  });

  return (
    <div className="weather-block">
      <div className="weather-title">
        <h1 className="city-country">
          <span className="city">{place.city}</span>
          <span className="country">{place.country}</span>
        </h1>
        <h3 className="date-time">
          <span className="date">{dayTime.format('ddd D MMM')}</span>
          <span className="time">{dayTime.format('HH:mm:ss')}</span>
        </h3>
      </div>

      <div className="weather-today">
        <div className="today-left">
          <span className="left-temp">
            {degrees === 'celcius'
              ? currentWeather.temp.toFixed(1)
              : toFahrenheit(currentWeather.temp).toFixed(1)}
          </span>
          <span className="left-degrees">°</span>
        </div>
        <div className="today-right">
          <img
            className="today-icon"
            src={`../assets/${currentWeather.weather.icon}.svg`}
            alt="today icon"
          />
          <div className="today-summary">
            <p className="summary">{currentWeather.weather.description}</p>
            <p className="feels">
              {textLabels.feels}:{' '}
              {degrees === 'celcius'
                ? currentWeather.app_temp.toFixed(1)
                : toFahrenheit(currentWeather.app_temp).toFixed(1)}
              °
            </p>
            <p className="wind">
              {textLabels.wind}: {currentWeather.wind_spd.toFixed(1)}{' '}
              <span className="ms">{textLabels.ms}</span>
            </p>
            <p className="humidity">
              {textLabels.hum}: {currentWeather.rh}%
            </p>
          </div>
        </div>
      </div>

      <div className="weather-days">{forecastDays}</div>
    </div>
  );
}

export default Weather;

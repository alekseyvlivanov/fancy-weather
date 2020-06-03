import React from 'react';

import { toFahrenheit } from '../../utils';

import './weather.css';

function Weather(props) {
  const {
    degrees,
    dtDay,
    dtF1,
    dtF2,
    dtF3,
    dtTime,
    place,
    weather,
    txtFeels,
    txtHum,
    txtMs,
    txtWind,
  } = props;

  const current = weather.current.data[0];
  const forecast1 = weather.forecast.data[1];
  const forecast2 = weather.forecast.data[2];
  const forecast3 = weather.forecast.data[3];

  return (
    <div className="weather-block">
      <div className="weather-title">
        <h1 className="city-country">
          <span className="city">{place.city}</span>
          <span className="country">{place.country}</span>
        </h1>
        <h3 className="date-time">
          <span className="date">{dtDay}</span>
          <span className="time">{dtTime}</span>
        </h3>
      </div>

      <div className="weather-today">
        <div className="today-left">
          <span className="left-temp">
            {degrees === 'celcius'
              ? current.temp.toFixed(1)
              : toFahrenheit(current.temp).toFixed(1)}
          </span>
          <span className="left-degrees">°</span>
        </div>
        <div className="today-right">
          <img
            className="today-icon"
            src={`../assets/${current.weather.icon}.svg`}
            alt="today icon"
          />
          <div className="today-summary">
            <p className="summary">{current.weather.description}</p>
            <p className="feels">
              {txtFeels}:{' '}
              {degrees === 'celcius'
                ? current.app_temp.toFixed(1)
                : toFahrenheit(current.app_temp).toFixed(1)}
              °
            </p>
            <p className="wind">
              {txtWind}: {current.wind_spd.toFixed(1)}{' '}
              <span className="ms">{txtMs}</span>
            </p>
            <p className="humidity">
              {txtHum}: {current.rh}%
            </p>
          </div>
        </div>
      </div>

      <div className="weather-days">
        <div className="weather-day">
          <h5>{dtF1}</h5>
          <div className="day-summary">
            <span>
              {degrees === 'celcius'
                ? forecast1.temp.toFixed(1)
                : toFahrenheit(forecast1.temp).toFixed(1)}
              °
            </span>
            <img
              className="day-icon"
              src={`../assets/${forecast1.weather.icon}.svg`}
              alt="day icon"
            />
          </div>
        </div>
        <div className="weather-day">
          <h5>{dtF2}</h5>
          <div className="day-summary">
            <span>
              {degrees === 'celcius'
                ? forecast2.temp.toFixed(1)
                : toFahrenheit(forecast2.temp).toFixed(1)}
              °
            </span>
            <img
              className="day-icon"
              src={`../assets/${forecast2.weather.icon}.svg`}
              alt="day icon"
            />
          </div>
        </div>
        <div className="weather-day">
          <h5>{dtF3}</h5>
          <div className="day-summary">
            <span>
              {degrees === 'celcius'
                ? forecast3.temp.toFixed(1)
                : toFahrenheit(forecast3.temp).toFixed(1)}
              °
            </span>
            <img
              className="day-icon"
              src={`../assets/${forecast3.weather.icon}.svg`}
              alt="day icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;

import React from 'react';

import './weather.css';

function Weather(props) {
  const current = props.weather.current.data[0];
  const forecast1 = props.weather.forecast.data[1];
  const forecast2 = props.weather.forecast.data[2];
  const forecast3 = props.weather.forecast.data[3];

  return (
    <div className="weather-block">
      <div className="weather-title">
        <h1 className="city-country">
          <span className="city">{props.place.city}</span>
          <span className="country">{props.place.country}</span>
        </h1>
        <h3 className="date-time">
          <span className="date">{props.dtDay}</span>
          <span className="time">{props.dtTime}</span>
        </h3>
      </div>

      <div className="weather-today">
        <div className="today-left">
          <span className="left-temp">{current.temp}</span>
          <span className="left-degrees">°</span>
        </div>
        <div className="today-right">
          <img
            className="today-icon"
            src={`../assets/${current.weather.icon}.png`}
            alt="today icon"
          />
          <div className="today-summary">
            <p className="summary">{current.weather.description}</p>
            <p className="feels">
              {props.txtFeels}: {current.app_temp}°
            </p>
            <p className="wind">
              {props.txtWind}: {current.wind_spd.toFixed(1)}{' '}
              <span className="ms">{props.txtMs}</span>
            </p>
            <p className="humidity">
              {props.txtHum}: {current.rh}%
            </p>
          </div>
        </div>
      </div>

      <div className="weather-days">
        <div className="weather-day">
          <h5>{props.dtF1}</h5>
          <div className="day-summary">
            <span>{forecast1.temp}°</span>
            <img
              className="day-icon"
              src={`../assets/${forecast1.weather.icon}.png`}
              alt="day icon"
            />
          </div>
        </div>
        <div className="weather-day">
          <h5>{props.dtF2}</h5>
          <div className="day-summary">
            <span>{forecast2.temp}°</span>
            <img
              className="day-icon"
              src={`../assets/${forecast2.weather.icon}.png`}
              alt="day icon"
            />
          </div>
        </div>
        <div className="weather-day">
          <h5>{props.dtF3}</h5>
          <div className="day-summary">
            <span>{forecast3.temp}°</span>
            <img
              className="day-icon"
              src={`../assets/${forecast3.weather.icon}.png`}
              alt="day icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;

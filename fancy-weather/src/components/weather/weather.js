import React from 'react';

import today from '../../assets/today.svg';

import './weather.css';

function Weather(props) {
  const current = props.weather.current.data[0];

  return (
    <div className="weather-block">
      <div className="weather-title">
        <h1 className="city-country">
          <span className="city">{props.place.city}</span>
          <span className="country">{props.place.country}</span>
        </h1>
        <h3 className="date-time">
          <span className="date">Fri 22 May</span>
          <span className="time">15:21:34</span>
        </h3>
      </div>

      <div className="weather-today">
        <div className="today-left">
          <span className="left-temp">{current.temp}</span>
          <span className="left-degrees">°</span>
        </div>
        <div className="today-right">
          <img className="today-icon" src={today} alt="today icon" />
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
          <h5>Tuesday</h5>
          <div className="day-summary">
            <span>7°</span>
            <img className="day-icon" src={today} alt="day icon" />
          </div>
        </div>
        <div className="weather-day">
          <h5>Wednesday</h5>
          <div className="day-summary">
            <span>6°</span>
            <img className="day-icon" src={today} alt="day icon" />
          </div>
        </div>
        <div className="weather-day">
          <h5>Thursday</h5>
          <div className="day-summary">
            <span>3°</span>
            <img className="day-icon" src={today} alt="day icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;

import React from 'react';

import today from '../../assets/today.svg';

import './weather.css';

function Weather() {
  return (
    <div className="weather-block">
      <div className="weather-title">
        <h1 className="city-country">
          <span className="city">Vladivostok</span>
          <span className="country">Russia</span>
        </h1>
        <h3 className="date-time">
          <span className="date">Fri 22 May</span>
          <span className="time">15:21:34</span>
        </h3>
      </div>
      <div className="weather-today">
        <div className="today-left">
          <span className="left-temp">10</span>
          <span className="left-degrees">°</span>
        </div>
        <div className="today-right">
          <img className="today-icon" src={today} alt="today icon" />
          <div className="today-summary">
            <p className="summary">Overcast</p>
            <p className="feels">Feels like: 7°</p>
            <p className="wind">Wind: 2 m/s</p>
            <p className="humidity">Humidity: 83%</p>
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

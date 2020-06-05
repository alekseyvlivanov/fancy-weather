import React from 'react';

import { CONSTANTS, toFahrenheit } from '../../utils';

import './marquee.css';

function Marquee(props) {
  const { degrees, textLabels, weather } = props;

  const items = weather.forecast.data.map((dayForecast, idx) => {
    return (
      <div key={idx} className="marquee-item">
        <span>{`${dayForecast.valid_date}:`}</span>
        <span>{dayForecast.weather.description}</span>
        <span>{`${
          degrees === CONSTANTS.degrees.celcius
            ? dayForecast.min_temp.toFixed(1)
            : toFahrenheit(dayForecast.min_temp).toFixed(1)
        }°-${
          degrees === CONSTANTS.degrees.celcius
            ? dayForecast.max_temp.toFixed(1)
            : toFahrenheit(dayForecast.max_temp).toFixed(1)
        }°`}</span>
        <span>{`${textLabels.wind} ${dayForecast.wind_spd.toFixed(1)} ${
          textLabels.ms
        }`}</span>
        <span>{`${textLabels.hum} ${dayForecast.rh}%`}</span>
      </div>
    );
  });

  return (
    <div className="marquee-block">
      <div className="marquee">{items}</div>
    </div>
  );
}

export default Marquee;

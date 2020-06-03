import React from 'react';

import { toFahrenheit } from '../../utils';

import './marquee.css';

function Marquee(props) {
  const { degrees, weather, txtHum, txtMs, txtWind } = props;

  const items = weather.forecast.data.map((dayForecast, idx) => {
    return (
      <div key={idx} className="marquee-item">
        <span>{`${dayForecast.valid_date}:`}</span>
        <span>{dayForecast.weather.description}</span>
        <span>{`${
          degrees === 'celcius'
            ? dayForecast.min_temp.toFixed(1)
            : toFahrenheit(dayForecast.min_temp).toFixed(1)
        }°-${
          degrees === 'celcius'
            ? dayForecast.max_temp.toFixed(1)
            : toFahrenheit(dayForecast.max_temp).toFixed(1)
        }°`}</span>
        <span>{`${txtWind} ${dayForecast.wind_spd.toFixed(1)} ${txtMs}`}</span>
        <span>{`${txtHum} ${dayForecast.rh}%`}</span>
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

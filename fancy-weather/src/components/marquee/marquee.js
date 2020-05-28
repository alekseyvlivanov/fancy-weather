import React from 'react';

import './marquee.css';

function Marquee(props) {
  const items = props.weather.forecast.data.map((e, i) => {
    return (
      <div key={i} className="marquee-item">
        <span>{`${e.valid_date}:`}</span>
        <span>{e.weather.description}</span>
        <span>{`${e.min_temp}°-${e.max_temp}°`}</span>
        <span>{`${props.txtWind} ${e.wind_spd.toFixed(1)} ${
          props.txtMs
        }`}</span>
        <span>{`${props.txtHum} ${e.rh}%`}</span>
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

import React from 'react';

import vladivostok from '../../assets/vladivostok.jpg';

import './maps.css';

function Maps() {
  return (
    <div className="maps-block">
      <div className="maps-google">
        <img src={vladivostok} alt="Vladivostok"></img>
      </div>
      <div className="maps-coordinates">
        <p>Latitude: 43°13'</p>
        <p>Longitude: 131°91'</p>
      </div>
    </div>
  );
}

export default Maps;

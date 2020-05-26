import React from 'react';

import vladivostok from '../../assets/vladivostok.jpg';

import './maps.css';

function Maps(props) {
  return (
    <div className="maps-block">
      <div className="maps-google">
        <img className="maps-image" src={vladivostok} alt="Vladivostok"></img>
      </div>
      <div className="maps-coordinates">
        <p>
          {props.txtLat}: {props.coords.lat}
        </p>
        <p>
          {props.txtLon}: {props.coords.lon}
        </p>
      </div>
    </div>
  );
}

export default Maps;

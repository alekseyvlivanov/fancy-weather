import React from 'react';

import MapsHere from '../maps-here';

import './maps.css';

function Maps(props) {
  return (
    <div className="maps-block">
      <MapsHere
        className="maps-here"
        apiKeyJS={props.apiKeyJS}
        coords={props.coords}
        lang={props.lang}
      />
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

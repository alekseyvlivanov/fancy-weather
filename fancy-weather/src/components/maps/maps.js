import React from 'react';

import './maps.css';

function Maps(props) {
  return (
    <div className="maps-block">
      <div className="maps-view" />
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

import React from 'react';

import MapsHere from '../maps-here';

import './maps.css';

function Maps(props) {
  const { apiKeyJS, coords, lang, txtLat, txtLon } = props;

  return (
    <div className="maps-block">
      {' '}
      <MapsHere
        className="maps-here"
        apiKeyJS={apiKeyJS}
        coords={coords}
        lang={lang}
      />
      <div className="maps-coordinates">
        <p>
          {txtLat}: {coords.lat}
        </p>
        <p>
          {txtLon}: {coords.lon}
        </p>
      </div>
    </div>
  );
}

export default Maps;

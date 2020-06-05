import React from 'react';

import MapsHere from '../maps-here';

import './maps.css';

function Maps(props) {
  const { apiKeyJS, coords, lang, textLabels } = props;

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
          {textLabels.lat}: {Math.trunc(coords.lat)}°
          {coords.lat.toFixed(2).slice(-2)}'
        </p>
        <p>
          {textLabels.lon}: {Math.trunc(coords.lon)}°
          {coords.lon.toFixed(2).slice(-2)}'
        </p>
      </div>
    </div>
  );
}

export default Maps;

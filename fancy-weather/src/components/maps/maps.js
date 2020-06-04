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
          {textLabels.lat}: {coords.lat}
        </p>
        <p>
          {textLabels.lon}: {coords.lon}
        </p>
      </div>
    </div>
  );
}

export default Maps;

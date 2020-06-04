import React, { useLayoutEffect, useRef } from 'react';

import './maps-here.css';

function MapsHere(props) {
  const { apiKeyJS, coords, lang } = props;

  const mapRef = useRef(null);

  useLayoutEffect(() => {
    if (!mapRef.current) return;

    const H = window.H;
    const platform = new H.service.Platform({
      apikey: apiKeyJS,
    });
    const defaultLayers = platform.createDefaultLayers({ lg: lang });
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: coords.lat, lng: coords.lon },
      pixelRatio: window.devicePixelRatio || 1,
      zoom: 14,
    });

    new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

    H.ui.UI.createDefault(hMap, defaultLayers);

    const marker = new H.map.Icon(`<svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" width="10px" height="10px">
    <circle cx="5" cy="5" r="4" fill="rgb(250, 127, 0)" stroke-width="1" stroke="black" opacity="1"/>
    </svg>`);

    hMap.addObject(
      new H.map.Marker({ lat: coords.lat, lng: coords.lon }, { icon: marker }),
    );

    return () => {
      hMap.dispose();
    };
  }, [mapRef, apiKeyJS, coords, lang]);

  return (
    <div
      className="maps-here"
      ref={mapRef}
      style={{ height: '400px', width: '375px' }}
    />
  );
}

export default MapsHere;

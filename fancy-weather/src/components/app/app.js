import React from 'react';

import Control from '../control';
import Search from '../search';
import Weather from '../weather';
import Maps from '../maps';
import Marquee from '../marquee/marquee';

import './app.css';

function App() {
  return (
    <div className="app">
      <div className="app-header">
        <Control />
        <Search />
      </div>
      <div className="app-main">
        <Weather />
        <Maps />
      </div>
      <div className="app-footer">
        <Marquee />
      </div>
    </div>
  );
}

export default App;

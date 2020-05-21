import React from 'react';

import Control from '../control';
import Search from '../search';

import './app.css';

function App() {
  return (
    <div className="app">
      <div className="app-header">
        <Control />
        <Search />
      </div>
      <div className="app-main">Main</div>
      <div className="app-footer">Footer</div>
    </div>
  );
}

export default App;

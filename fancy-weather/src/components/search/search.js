import React from 'react';

import microphone from '../../assets/microphone.svg';

import './search.css';

function Search() {
  return (
    <div className="search-city">
      <input
        className="search-input"
        type="text"
        placeholder="Search city or ZIP"
      />
      <img
        className="search-voice"
        src={microphone}
        alt="Search by voice"
        title="Search by voice"
      />
      <button className="search-submit" type="submit">
        Search
      </button>
    </div>
  );
}

export default Search;

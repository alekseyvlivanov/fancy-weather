import React from 'react';

import refresh from '../../assets/refresh.svg';

import './control.css';

function Control() {
  return (
    <div className="control-block">
      <button className="control-refresh" title="Refresh background">
        <img src={refresh} alt="Refresh background" />
      </button>
      <div className="control-lang">
        <select name="lang">
          <option value="en">EN</option>
          <option value="ru">RU</option>
          <option value="be">BE</option>
        </select>
      </div>
      <div className="control-degrees">
        <input type="radio" name="degrees" id="fahrenheit" value="fahrenheit" />
        <label className="fahrenheit" htmlFor="fahrenheit">
          °F
        </label>
        <input
          type="radio"
          name="degrees"
          id="celcius"
          value="celcius"
          defaultChecked
        />
        <label className="celsius" htmlFor="celcius">
          °C
        </label>
      </div>
    </div>
  );
}

export default Control;

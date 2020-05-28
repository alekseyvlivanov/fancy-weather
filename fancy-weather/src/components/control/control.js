import React from 'react';

import refresh from '../../assets/refresh.svg';

import './control.css';

function Control(props) {
  return (
    <div className="control-block">
      <button
        className="control-refresh"
        title={props.txtRefresh}
        onClick={() => props.cbLoading()}
      >
        <img
          src={refresh}
          alt="Refresh background"
          style={{
            animation: props.loading ? 'refresh 1.5s linear infinite' : '',
          }}
        />
      </button>

      <div className="control-lang">
        <select
          name="lang"
          value={props.lang}
          onChange={(e) => props.cbLang(e.target.value)}
        >
          <option value="en">EN</option>
          <option value="ru">RU</option>
          <option value="be">BE</option>
        </select>
      </div>

      <div className="control-degrees">
        <input
          type="radio"
          name="degrees"
          id="fahrenheit"
          value="fahrenheit"
          checked={props.degrees === 'fahrenheit'}
          onChange={(e) => props.cbDegrees(e.target.value)}
        />
        <label className="fahrenheit" htmlFor="fahrenheit">
          °F
        </label>
        <input
          type="radio"
          name="degrees"
          id="celcius"
          value="celcius"
          checked={props.degrees === 'celcius'}
          onChange={(e) => props.cbDegrees(e.target.value)}
        />
        <label className="celsius" htmlFor="celcius">
          °C
        </label>
      </div>
    </div>
  );
}

export default Control;

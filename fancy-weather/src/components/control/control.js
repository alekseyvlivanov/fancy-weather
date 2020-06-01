import React from 'react';

import refresh from '../../assets/refresh.svg';
// import audio from '../../assets/audio.svg';

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

      <button
        className="control-audio"
        title={props.txtSpeak}
        onClick={props.cbSpeak}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
        </svg>
      </button>
    </div>
  );
}

export default Control;

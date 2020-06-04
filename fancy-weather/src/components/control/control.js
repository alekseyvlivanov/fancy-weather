import React from 'react';

import refresh from '../../assets/refresh.svg';

import './control.css';

function Control(props) {
  const {
    degrees,
    handleDegrees,
    lang,
    handleLang,
    loading,
    handleLoading,
    handleSpeak,
    textLabels,
  } = props;

  return (
    <div className="control-block">
      <button
        className="control-refresh"
        title={textLabels.refresh}
        onClick={() => handleLoading()}
      >
        <img
          src={refresh}
          alt="Refresh background"
          style={{
            animation: loading ? 'refresh 1.5s linear infinite' : '',
          }}
        />
      </button>

      <div className="control-lang">
        <select
          name="lang"
          value={lang}
          onChange={(e) => handleLang(e.target.value)}
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
          checked={degrees === 'fahrenheit'}
          onChange={(e) => handleDegrees(e.target.value)}
        />
        <label className="fahrenheit" htmlFor="fahrenheit">
          °F
        </label>
        <input
          type="radio"
          name="degrees"
          id="celcius"
          value="celcius"
          checked={degrees === 'celcius'}
          onChange={(e) => handleDegrees(e.target.value)}
        />
        <label className="celsius" htmlFor="celcius">
          °C
        </label>
      </div>

      <button
        className="control-audio"
        title={textLabels.speak}
        onClick={() => handleSpeak()}
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

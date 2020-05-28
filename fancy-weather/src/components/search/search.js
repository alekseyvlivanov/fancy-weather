import React from 'react';

import microphone from '../../assets/microphone.svg';

import './search.css';

function Search(props) {
  const [input, setInput] = React.useState('');

  function cbInput(e) {
    setInput(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    props.cbSearch(input);
  }

  return (
    <form className="search-city" onSubmit={onSubmit}>
      <input
        className="search-input"
        type="text"
        placeholder={props.txtInput}
        value={input}
        onChange={cbInput}
      />
      <img
        className="search-voice"
        src={microphone}
        alt="Search by voice"
        title={props.txtVoice}
      />
      <button className="search-submit" type="submit">
        {props.txtSearch}
      </button>
    </form>
  );
}

export default Search;

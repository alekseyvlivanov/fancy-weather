import React, { useContext, useEffect, useState } from 'react';
import 'notyf/notyf.min.css';
import NotyfContext from '../../notyf-context';

import {
  CONSTANTS,
  voiceActions,
  voiceCommands,
  toFahrenheit,
} from '../../utils';

import './search.css';

function Search(props) {
  const {
    degrees,
    dtF1,
    dtF2,
    dtF3,
    lang,
    place,
    handleSearch,
    weather,
    txtFeels,
    txtHum,
    txtInput,
    txtMs,
    txtSearch,
    txtWind,
    txtVoice,
  } = props;

  const notyf = useContext(NotyfContext);

  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [volume, setVolume] = useState(5);

  const current = weather.current.data[0];
  const forecast = [
    { dt: dtF1, f: weather.forecast.data[1] },
    { dt: dtF2, f: weather.forecast.data[2] },
    { dt: dtF3, f: weather.forecast.data[3] },
  ];

  function cbInput(e) {
    setInput(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    handleSearch(input);
  }

  function handleVoiceClick(e) {
    if (recognition) {
      setListening(!listening);
    } else {
      notyf.error("Your browser doesn't support Speech recognition");
    }
  }

  function updateListening() {
    if (recognition) {
      if (listening) {
        document.querySelector('.search-voice').classList.add('listening');
        recognition.start();
      } else {
        recognition.abort();
        recognition.stop();
        document.querySelector('.search-voice').classList.remove('listening');

        if (utterance && !speaking) {
          speechSynthesis.cancel();
        }
      }
    }
  }
  useEffect(updateListening, [listening]);

  function updateVolume() {
    if (recognition && listening) {
      notyf.success(`Volume is ${volume / 10}`);
    }
  }
  useEffect(updateVolume, [volume]);

  function updateSpeaking() {
    if (utterance && !speaking) {
      speechSynthesis.cancel();
    }
  }
  useEffect(updateSpeaking, [speaking]);

  function speak() {
    if (utterance) {
      window.console.log(utterance.text);
      speechSynthesis.speak(utterance);
    }
  }
  useEffect(speak, [utterance]);

  function initRecognition() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (typeof SpeechRecognition === 'undefined') return;

    if (recognition && listening) {
      recognition.abort();
      recognition.stop();
      setListening(false);
    }

    const newRecognition = new SpeechRecognition();

    newRecognition.continuous = true;
    newRecognition.interimResults = false;
    newRecognition.lang = lang;

    newRecognition.onstart = function () {
      setListening(true);
    };

    newRecognition.onend = function () {
      setListening(false);
    };

    newRecognition.onresult = function (e) {
      const commands = Object.keys(voiceCommands);
      const transcript = e.results[e.resultIndex][0].transcript;
      const term = transcript.trim().toLowerCase();
      const speakLang = lang === CONSTANTS.langs.en ? lang : CONSTANTS.langs.ru;

      if (commands.includes(term)) {
        switch (voiceCommands[term]) {
          case voiceActions.weather:
          case voiceActions.forecast:
            if (utterance && speaking) {
              setSpeaking(false);
            }

            let txtWeather;

            if (voiceCommands[term] === voiceActions.weather) {
              txtWeather = `
              ${place.city} ${place.country}.
              ${
                lang === CONSTANTS.langs.en
                  ? 'Current weather'
                  : 'Текущая погода'
              }: ${
                degrees === 'celcius'
                  ? current.temp.toLocaleString(speakLang, {
                      maximumFractionDigits: 1,
                    })
                  : toFahrenheit(current.temp).toLocaleString(speakLang, {
                      maximumFractionDigits: 1,
                    })
              }°.
              ${current.weather.description}.
              ${txtFeels}: ${
                degrees === 'celcius'
                  ? current.app_temp.toLocaleString(speakLang, {
                      maximumFractionDigits: 1,
                    })
                  : toFahrenheit(current.app_temp).toLocaleString(speakLang, {
                      maximumFractionDigits: 1,
                    })
              }°.
              ${txtWind}: ${current.wind_spd.toLocaleString(speakLang, {
                maximumFractionDigits: 1,
              })} ${txtMs}.
              ${txtHum}: ${current.rh}%.
              `;
            } else if (voiceCommands[term] === voiceActions.forecast) {
              txtWeather = `
              ${place.city} ${place.country}.
              ${
                lang === CONSTANTS.langs.en
                  ? 'Forecast weather'
                  : 'Прогноз погоды'
              }.
              ${forecast
                .map((dtF) => {
                  return `
                ${dtF.dt}.
                ${
                  degrees === 'celcius'
                    ? dtF.f.temp.toLocaleString(speakLang, {
                        maximumFractionDigits: 1,
                      })
                    : toFahrenheit(dtF.f.temp).toLocaleString(speakLang, {
                        maximumFractionDigits: 1,
                      })
                }°.
                ${dtF.f.weather.description}.
                `;
                })
                .join('')}
              `;
            } else {
              notyf.error('Unknown command');
              return;
            }

            const newUtterance = new SpeechSynthesisUtterance();
            newUtterance.lang =
              lang === CONSTANTS.langs.en ? lang : CONSTANTS.langs.ru;
            newUtterance.volume = volume / 10;
            newUtterance.text = txtWeather;

            setSpeaking(true);
            setUtterance(newUtterance);

            break;
          case voiceActions.louder:
            setVolume((prevVolume) => Math.min(prevVolume + 1, 10));
            break;
          case voiceActions.quieter:
            setVolume((prevVolume) => Math.max(prevVolume - 1, 0));
            break;
          default:
            notyf.error('Unknown command');
        }
      } else {
        setInput(transcript);
        handleSearch(transcript);
      }
    };

    setRecognition(newRecognition);
  }
  useEffect(initRecognition, [
    degrees,
    place,
    weather,
    txtFeels,
    txtWind,
    txtMs,
    txtHum,
    lang,
  ]);

  return (
    <form className="search-city" onSubmit={onSubmit}>
      <input
        className="search-input"
        type="text"
        placeholder={txtInput}
        value={input}
        onChange={cbInput}
      />

      <svg
        className="search-voice"
        onClick={handleVoiceClick}
        width="16"
        height="18"
        viewBox="0 0 16 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.86774 11.003C7.00412 11.003 6.26271 10.7403 5.64351 10.2149C5.02431 9.68954 4.71472 9.06737 4.71472 8.34841V3.03921C4.71472 2.29261 5.02431 1.66352 5.64351 1.15196C6.26271 0.640395 7.00412 0.384613 7.86774 0.384613C8.73135 0.384613 9.46462 0.640395 10.0675 1.15196C10.6704 1.66352 10.9719 2.29261 10.9719 3.03921V8.34841C10.9719 9.06737 10.6704 9.68954 10.0675 10.2149C9.46462 10.7403 8.73135 11.003 7.86774 11.003ZM13.3672 8.34841H15.1759C15.1759 9.84163 14.5649 11.1482 13.3428 12.2681C12.1207 13.388 10.646 14.0586 8.91874 14.2798V17.1833H6.81673V14.2798C5.08949 14.0586 3.61482 13.3811 2.39272 12.2474C1.17062 11.1136 0.55957 9.81398 0.55957 8.34841H2.3194C2.3194 9.62041 2.87342 10.685 3.98145 11.5422C5.08949 12.3994 6.38492 12.8281 7.86774 12.8281C9.35055 12.8281 10.6378 12.3994 11.7296 11.5422C12.8213 10.685 13.3672 9.62041 13.3672 8.34841Z"
          fill="white"
          fillOpacity="0.4"
        />
        <title>{txtVoice}</title>
      </svg>

      <button className="search-submit" type="submit">
        {txtSearch}
      </button>
    </form>
  );
}

export default Search;

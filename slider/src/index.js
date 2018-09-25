import AwesomeSlider from './js/slider.js';
import { getPeople, getPlanets } from './js/slider-service.js';
import './styles/main.scss';

// init
window.addEventListener('DOMContentLoaded', function() {

  getPlanets().then(function(data) {
      return JSON.parse(data)
    })
    .then(function(data) {
      const slider1 = new AwesomeSlider('#slider1', data.results);
    });

  getPeople().then(function(data) {
      return JSON.parse(data)
    })
    .then(function(data) {
      const slider2 = new AwesomeSlider('#slider2', data.results);
    });

}, true);

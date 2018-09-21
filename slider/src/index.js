import AwesomeSlider from './js/slider.js';
import { getSlides } from './js/slider-service.js';
import './styles/styles.scss';

// init
window.addEventListener('DOMContentLoaded', function() {

  getSlides().then(function(slides) {
    const slider1 = new AwesomeSlider('#slider1', slides);
    const slider2 = new AwesomeSlider('#slider2', slides);
    slider2.setSlide(1);
  });

}, true);

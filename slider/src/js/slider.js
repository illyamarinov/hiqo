// import { getSlides } from './slider-service.js';
import area from '../templates/area.hbs';
import slide from '../templates/slide.hbs';
import dots from '../templates/dots.hbs';

class AwesomeSlider {

  constructor(selector, slides) {
    this.container = document.querySelector(selector);
    this.selector = selector;
    this.slides = slides;
    this.current_slide = {};
    this.current_slide_index = 0;

    this.init();
  }

  setSlide(slideIndex) {

    // validate slideIndex
    if (slideIndex < 0 && slideIndex > slides.length - 1) {
      return;
    }
    this.current_slide = this.slides[slideIndex];
    this.current_slide_index = slideIndex;
    this.renderSlide();
  }

  init() {
    this.renderSlider();
    this.setSlide(0);
  }

  render(template, context = {}) {
    return template(context);
  }

  renderSlider() {
    this.renderArea();
    this.renderDots();
    this.renderArrows();
  }

  renderSlide() {
    const slideContent = document.querySelector(`${this.selector} .slider__content`);
    let context = {
      description: this.current_slide.description,
      title: this.current_slide.title
    };
    slideContent.innerHTML = this.render(slide, context);
      // var context = CURRENT_SLIDE;
      // template.render(context);
      // insert to the DOM
  }

  renderArea() {
    this.container.innerHTML = this.render(area);
  }

  renderDots() {
    const sliderDots = document.querySelector(`${this.selector} .slider__navigation__dots`);
    let context = [];

    for (let i = 0; i <= this.slides.length - 1; i++) {
      context.push({});
    }
    
    sliderDots.innerHTML = this.render(dots, context);

    sliderDots.addEventListener('click', function(event) {
      let slideIndex = event.target.dataset.index;
      this.setSlide(slideIndex);
      this.renderSlide(slideIndex);
    });
  }

  renderArrows() {
    //

    // leftButton.addEventListener('click', function(event) {
    //     let slideIndex = (event.target.dataset.index + SLIDES.length - 1) % SLIDES.length;
    //     setSlide(slideIndex);
    //     renderSlide(slideIndex);
    // });
    // rightButton.addEventListener('click', function(event) {
    //     let slideIndex = (event.target.dataset.index + 1) % SLIDES.length;
    //     setSlide(slideIndex);
    //     renderSlide(slideIndex);
    // });
  }

}

// const Slider = (function() {
//
//   // Variables
//   let SLIDES = [];
//   let CURRENT_SLIDE = {};
//   let CURRENT_SLIDE_INDEX = 0;
//
//   // Methods
//   const init = function(slides) {
//     SLIDES = slides;
//     setSlide(0);
//
//     renderSlider();
//     renderSlide();
//   };
//
//   const setSlide = function(sliderIndex) {
//     CURRENT_SLIDE_INDEX = sliderIndex;
//     CURRENT_SLIDE = SLIDES[sliderIndex];
//   }
//
//   const renderSlider = function(sliderIndex) {
//     renderArea();
//     renderDots();
//     renderArrows();
//
//     leftButton.addEventListener('click', function(event) {
//         let slideIndex = (event.target.dataset.index + SLIDES.length - 1) % SLIDES.length;
//         setSlide(slideIndex);
//         renderSlide(slideIndex);
//     });
//     rightButton.addEventListener('click', function(event) {
//         let slideIndex = (event.target.dataset.index + 1) % SLIDES.length;
//         setSlide(slideIndex);
//         renderSlide(slideIndex);
//     });
//     dotButton.addEventListener('click', function(event) {
//         let slideIndex = event.target.dataset.index;
//         setSlide(slideIndex);
//         renderSlide(slideIndex);
//     });
//   };
//
//   const renderSlide = function() {
//       // var context = CURRENT_SLIDE;
//       // template.render(context);
//       // insert to the DOM
//   };
//
//   return {
//     init
//   };
//
// })();


export default AwesomeSlider;

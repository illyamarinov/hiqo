import wrapper from '../templates/wrapper.hbs';
import leftArrow from '../templates/left-arrow.hbs';
import rightArrow from '../templates/right-arrow.hbs';
import slide from '../templates/slide.hbs';
import dots from '../templates/dots.hbs';
import { CONSTANTS } from './constants.js';

class AwesomeSlider {

  // AwesomeSlider's initing
  constructor(selector, slides) {
    this.container = document.querySelector(selector);
    this.selector = selector;
    this.slides = slides;
    this.slidesLength = slides.length;
    this.currentSlide = {};
    this.currentSlideIndex = 0;
    this.init = true;

    this.CLASSES = CONSTANTS.CLASSES;
    this.SELECTORS = CONSTANTS.SELECTORS;
    this.sliderWrapperSelector = `${this.selector} ${this.CLASSES.WRAPPER}`;
    this.sliderContentSelector = `${this.selector} ${this.CLASSES.CONTENT}`;
    this.sliderDotsSelector = `${this.selector} ${this.CLASSES.NAVIGATION_DOTS}`;
    this.sliderLeftArrowSelector = `${this.selector} ${this.CLASSES.ARROW_LEFT}`;
    this.sliderRightArrowSelector = `${this.selector} ${this.CLASSES.ARROW_RIGHT}`;

    this.renderSlider();
  }

  // set specific slide
  setSlide(next) {

    // validate slideIndex
    if (next < 0 && next > this.slidesLength - 1) {
      return;
    }
    const previous = this.currentSlideIndex;
    const direction = previous - next > 0 ? 'left' : 'right';
    this.currentSlide = this.slides[next];
    this.currentSlideIndex = next;
    this.dotsClassHandler(previous, next);
    this.renderSlide(direction);
  }

  // rendering template with/without specific context
  render(template, context = {}) {
    return template(context);
  }

  // сalling the methods of the components of the slider, and set first slide
  renderSlider() {
    this.renderWrapper();
    this.renderLeftArrow();
    this.renderRightArrow();
    this.renderDots();
    this.setSlide(0);
  }

  // render specific slide
  renderSlide(direction) {
    const slideWrapper = document.querySelector(this.sliderWrapperSelector);
    const slideContent = document.querySelector(this.sliderContentSelector);
    // const { imgUrl, ...context } = this.currentSlide;
    if (this.init) {
      slideWrapper.insertAdjacentHTML('afterBegin', this.render(slide, this.currentSlide));
      this.init = false;
      return;
    }

    if (direction === 'right') {
      slideContent.classList.add('slider__content_left')
      slideContent.insertAdjacentHTML('afterEnd', this.render(slide, this.currentSlide));
      const left = document.querySelector('[class *= "slider__content_left"]');
      slideWrapper.removeChild(left);

    } else {
      slideContent.insertAdjacentHTML('beforeBegin', this.render(slide, this.currentSlide));
    }

  }

  // render wrapper for slider
  renderWrapper() {
    this.container.innerHTML = this.render(wrapper);
  }

  // render navigation dots for slider
  renderDots() {
    const sliderWrapper = document.querySelector(this.sliderWrapperSelector);
    const context = { dots: [] };

    for (let i = 0, active = false; i < this.slidesLength; i++) {
      if (i === this.currentSlideIndex) {
        active = true;
      }
      context.dots.push({
        index: i + 1,
        active
      });
      active = false;
    }

    sliderWrapper.insertAdjacentHTML('beforeEnd', this.render(dots, context));

    const sliderDots = document.querySelector(this.sliderDotsSelector);
    sliderDots.addEventListener('click', (event) => {
      if (event.target.className.indexOf(this.SELECTORS.WRAPPER_DOTS) === -1 && event.target.className.indexOf(this.SELECTORS.SINGLE_DOT) !== -1) {
        const slideIndex = +event.target.dataset.index;
        this.setSlide(slideIndex);
      }
    });
  }

  // change active dots class
  dotsClassHandler(previous, next) {
    const dotsArr = document.querySelectorAll(`${this.selector} ${this.CLASSES.SINGLE_DOT}`);
    dotsArr[previous].classList.remove(this.SELECTORS.ACTIVE_DOT);
    dotsArr[next].classList.add(this.SELECTORS.ACTIVE_DOT);
  }

  // render left arrow for slider
  renderLeftArrow() {
    const sliderWrapper = document.querySelector(this.sliderWrapperSelector);
    sliderWrapper.insertAdjacentHTML('beforeEnd', this.render(leftArrow));

    const leftButton = document.querySelector(this.sliderLeftArrowSelector);
    leftButton.addEventListener('click', this.arrowClickHandler.bind(this));

  }

  // render right arrow for slider
  renderRightArrow() {
    const sliderWrapper = document.querySelector(this.sliderWrapperSelector);
    sliderWrapper.insertAdjacentHTML('beforeEnd', this.render(rightArrow));

    const rightButton = document.querySelector(this.sliderRightArrowSelector);
    rightButton.addEventListener('click', this.arrowClickHandler.bind(this));
  }

  // handler for arrows, that allows to change slides
  arrowClickHandler(event) {
    const direction = event.target.dataset.direction === 'left' ? -1 : 1;
    const slideIndex = (this.currentSlideIndex + this.slidesLength + direction) % this.slidesLength;
    this.setSlide(slideIndex);
  }

  animation() {

  }
}

export default AwesomeSlider;

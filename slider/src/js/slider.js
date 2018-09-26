import wrapper from '../templates/wrapper.hbs';
import leftArrow from '../templates/left-arrow.hbs';
import rightArrow from '../templates/right-arrow.hbs';
import slide from '../templates/slide.hbs';
import dots from '../templates/dots.hbs';
import { CONSTANTS } from './constants.js';

class AwesomeSlider {

  constructor(selector, slides) {
    this.container = document.querySelector(selector);
    this.selector = selector;
    this.slides = slides;
    this.slidesLength = slides.length;
    this.currentSlide = {};
    this.currentSlideIndex = 0;

    this.CLASSES = CONSTANTS.CLASSES;
    this.SELECTORS = CONSTANTS.SELECTORS;
    this.sliderWrapperSelector = `${this.selector} ${this.CLASSES.WRAPPER}`;
    this.sliderContentSelector = `${this.selector} ${this.CLASSES.CONTENT}`;
    this.sliderDotsSelector = `${this.selector} ${this.CLASSES.NAVIGATION_DOTS}`;
    this.sliderLeftArrowSelector = `${this.selector} ${this.CLASSES.ARROW_LEFT}`;
    this.sliderRightArrowSelector = `${this.selector} ${this.CLASSES.ARROW_RIGHT}`;

    this.renderSlider();
    this.setSlide(0);
  }

  setSlide(slideIndex) {

    // validate slideIndex
    if (slideIndex < 0 && slideIndex > this.slidesLength - 1) {
        return;
    }
    this.currentSlide = this.slides[slideIndex];
    this.currentSlideIndex = slideIndex;
    this.renderSlide();
  }

  render(template, context = {}) {
    return template(context);
  }

  renderSlider() {
    this.renderWrapper();
    this.renderArrows();
    this.renderDots();
  }

  renderSlide() {
    const slideContent = document.querySelector(this.sliderContentSelector);
    // const { imgUrl, ...context } = this.currentSlide;
    slideContent.innerHTML = this.render(slide, this.currentSlide);
  }

  renderWrapper() {
    this.container.innerHTML = this.render(wrapper);
  }

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
        const previousSlide = this.currentSlideIndex;
        this.setSlide(slideIndex);
        const nextSlide = this.currentSlideIndex;
        this.dotsClassHandler(previousSlide, nextSlide);
      }
    });
  }

  // change active dots class
  dotsClassHandler(previous, next) {
    const dotsArr = document.querySelectorAll(`${this.selector} ${this.CLASSES.SINGLE_DOT}`);
    dotsArr[previous].classList.remove(this.SELECTORS.ACTIVE_DOT);
    dotsArr[next].classList.add(this.SELECTORS.ACTIVE_DOT);
  }

  renderArrows() {
    this.renderLeftArrow();
    this.renderRightArrow();
  }

  renderLeftArrow() {
    const sliderWrapper = document.querySelector(this.sliderWrapperSelector);
    sliderWrapper.insertAdjacentHTML('beforeEnd', this.render(leftArrow));

    const leftButton = document.querySelector(this.sliderLeftArrowSelector);
    leftButton.addEventListener('click', this.arrowClickHandler.bind(this));
  }

  renderRightArrow() {
    const sliderWrapper = document.querySelector(this.sliderWrapperSelector);
    sliderWrapper.insertAdjacentHTML('beforeEnd', this.render(rightArrow));

    const rightButton = document.querySelector(this.sliderRightArrowSelector);
    rightButton.addEventListener('click', this.arrowClickHandler.bind(this));
  }

  arrowClickHandler(event) {
    const direction = event.target.dataset.direction === 'left' ? -1 : 1;
    const slideIndex = (this.currentSlideIndex + this.slidesLength + direction) % this.slidesLength;
    const previousSlide = this.currentSlideIndex;
    this.setSlide(slideIndex);
    const nextSlide = this.currentSlideIndex;
    this.dotsClassHandler(previousSlide, nextSlide);
  }

}

export default AwesomeSlider;

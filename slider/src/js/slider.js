import wrapper from '../templates/wrapper.hbs';
import leftArrow from '../templates/left-arrow.hbs';
import rightArrow from '../templates/right-arrow.hbs';
import slide from '../templates/slide.hbs';
import dots from '../templates/dots.hbs';

class AwesomeSlider {

  constructor(selector, slides) {
    this.container = document.querySelector(selector);
    this.selector = selector;
    this.slides = slides;
    this.slidesLength = slides.length;
    this.currentSlide = {};
    this.currentSlideIndex = 0;

    this.sliderWrapperSelector = `${this.selector} .slider`;
    this.sliderContentSelector = `${this.selector} .slider__content`;
    this.sliderDotsSelector = `${this.selector} .slider__navigation__dots`;
    this.sliderLeftArrowSelector = `${this.selector} .slider__navigation__arrow_left`;
    this.sliderRightArrowSelector = `${this.selector} .slider__navigation__arrow_right`;

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
    const { imgUrl, ...context } = this.currentSlide;
    slideContent.innerHTML = this.render(slide, this.currentSlide);
  }

  renderWrapper() {
    this.container.innerHTML = this.render(wrapper);
  }

  renderDots() {
    const sliderWrapper = document.querySelector(this.sliderWrapperSelector);
    let context = { dots: []};

    for (let i = 0; i < this.slidesLength; i++) {
      context.dots.push(i + 1);
    }

    sliderWrapper.insertAdjacentHTML('beforeEnd', this.render(dots, context));

    const sliderDots = document.querySelector(this.sliderDotsSelector);
    sliderDots.addEventListener('click', (event) => {
      if (event.target.className === 'dot') {
        const slideIndex = event.target.dataset.index;
        this.setSlide(slideIndex);
        this.renderSlide(slideIndex);
      }
    });
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

    this.setSlide(slideIndex);
    this.renderSlide(slideIndex);
  }

}

export default AwesomeSlider;

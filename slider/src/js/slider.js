import area from '../templates/area.hbs';
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
    this.renderArea();
    this.renderArrows();
    this.renderDots();
  }

  renderSlide() {
    const slideContent = document.querySelector(this.sliderContentSelector);
    const { imgUrl, ...context } = this.currentSlide;
    slideContent.innerHTML = this.render(slide, context);
  }

  renderArea() {
    this.container.innerHTML = this.render(area);
  }

  renderDots() {
    const sliderWrapper = document.querySelector(this.sliderWrapperSelector);
    let context = { dots: []};

    for (let i = 0; i < this.slidesLength; i++) {
      context.dots.push(i+1);
    }

    sliderWrapper.innerHTML += this.render(dots, context);

    const sliderDots = document.querySelector(this.sliderDotsSelector);
    sliderDots.addEventListener('click', function(event) {
      if (event.target.className === 'dot') {
        let slideIndex = event.target.dataset.index;
        this.setSlide(slideIndex);
        this.renderSlide(slideIndex);
      }

    }.bind(this));
  }

  // TODO: fix arrow wrong work 

  renderArrows() {
    this.renderLeftArrow();
    this.renderRightArrow();
  }

  renderLeftArrow() {
    const sliderWrapper = document.querySelector(this.sliderWrapperSelector);
    sliderWrapper.innerHTML += this.render(leftArrow);
    console.log(sliderWrapper);
    const leftButton = document.querySelector('.slider__navigation__arrow_left');
    console.log(leftButton)
    leftButton.addEventListener('click', function(event) {
      let slideIndex = (this.currentSlideIndex + this.slidesLength - 1) % this.slidesLength;
      this.setSlide(slideIndex);
      this.renderSlide(slideIndex);
    }.bind(this));

  }

  renderRightArrow() {
    const sliderWrapper = document.querySelector(this.sliderWrapperSelector);
    sliderWrapper.innerHTML += this.render(rightArrow);

    const rightButton = document.querySelector('.slider__navigation__arrow_right');
    console.log(rightButton);
    rightButton.addEventListener('click', function(event) {
      let slideIndex = (this.currentSlideIndex + 1) % this.slidesLength;
      this.setSlide(slideIndex);
      this.renderSlide(slideIndex);
    }.bind(this));
  }

}

export default AwesomeSlider;

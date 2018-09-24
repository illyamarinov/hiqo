import area from '../templates/area.hbs';
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
        this.sliderContentSelector = `${this.selector} .slider__content`;
        this.sliderDotsSelector = `${this.selector} .slider__navigation__dots`;

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
        this.renderDots();
        this.renderArrows();
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
        const sliderDots = document.querySelector(this.sliderDotsSelector);
        let context = [];

        for (let i = 0; i < this.slidesLength; i++) {
            context.push({});
        }

        sliderDots.innerHTML = this.render(dots, context);

        sliderDots.addEventListener('click', function (event) {
            let slideIndex = event.target.dataset.index;
            this.setSlide(slideIndex);
            this.renderSlide(slideIndex);
        });
    }

    renderArrows() {
        //

        // leftButton.addEventListener('click', function(event) {
        //     let slideIndex = (this.currentSlideIndex + this.slidesLength - 1) % this.slidesLength;
        //     setSlide(slideIndex);
        //     renderSlide(slideIndex);
        // });
        // rightButton.addEventListener('click', function(event) {
        //     let slideIndex = (this.currentSlideIndex + 1) % this.slidesLength;
        //     setSlide(slideIndex);
        //     renderSlide(slideIndex);
        // });
    }

}

export default AwesomeSlider;

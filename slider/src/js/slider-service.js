import { Slide } from './models';

const slides = [
  new Slide('https://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg', 'Cat1', 'funny cats'),
  new Slide('https://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg', 'Cat2'),
  new Slide('https://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg', 'Cat3'),
  new Slide('https://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg', 'Cat4'),
  new Slide('https://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg', 'Cat5')
];

const getSlides = function() {
  return Promise.resolve(slides);
};

export { getSlides };

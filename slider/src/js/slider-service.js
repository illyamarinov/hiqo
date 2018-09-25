import { Slide } from './models';

// const slides = [
//   new Slide('https://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg', 'Cat1', 'funny cats'),
//   new Slide('https://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg', 'Cat2'),
//   new Slide('https://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg', 'Cat3'),
//   new Slide('https://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg', 'Cat4'),
//   new Slide('https://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg', 'Cat5')
// ];

const getSlides = function() {
  // TODO: get planets from API
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://swapi.co/api/planets');

    xhr.onload = function() {
      if (this.status >= 200 && this.status < 300) {
        resolve(this.responseText);
      } else {
        reject({
          status: this.status,
          statusText: this.statusText,
          responseText: this.responseText
        });
      }
    };

    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: this.statusText
      });
    };

    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.send(body);
  });
};

export { getSlides };

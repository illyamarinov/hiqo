import { Slide } from './models';

const baseUrl = 'https://swapi.co/api';
const planetsUrl = `${baseUrl}/planets`;
const peopleUrl = `${baseUrl}/people`;

const get = function(url) {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    xhr.onload = function() {
      if (this.status >= 200 && this.status < 300) {
        resolve(this.responseText);
      } else {
        const { status, statusText, responseText } = this.status;
        reject({
          status,
          statusText,
          responseText
        });
      }
    };

    xhr.onerror = function() {
      reject({
        status: this.status,
        statusText: this.statusText
      });
    };

    xhr.send();
  });
};

const getPlanets = function() {
  return get(planetsUrl);
};

const getPeople = function() {
  return get(peopleUrl);
};

export { getPeople, getPlanets };

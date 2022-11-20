import * as DOM from '../dom';

class App {
  constructor() {}

  // Display the time to the UI
  displayTime(time) {
    DOM.momentumTime.textContent = time;
  }

  // Display the greet message to the UI
  displayGreet(text) {
    DOM.momentumGreet.textContent = text;
  }

  // Display name
  displayName(name) {
    DOM.momentumName.textContent = name;
  }

  // Display focus
  displayFocus(text) {
    DOM.momentumFocus.textContent = text;
  }

  // Display the random quote to the UI
  displayQuote(author, text) {
    DOM.quoteTitle.textContent = text;
    DOM.quoteAuthor.textContent = author;
  }

  // Display the city name
  displayCityName(city) {
    DOM.weatherCity.textContent = city;
  }

  // Display the temperature
  displayTemperature(temp) {
    DOM.weatherTemp.innerHTML = `<h2 class="weather-temp">${temp} &#8451;</h2>`;
  }
}

export const app = new App();

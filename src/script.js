import 'core-js';
import 'regenerator-runtime/runtime.js';

// Controller module
import * as model from './model';
import { app } from './views/view';
import { momentumName, momentumFocus } from './dom';

// Controller function
const controller = async function () {
  try {
    // Set time
    setInterval(function () {
      const time = model.setTime();
      app.displayTime(time);
    }, 1000);

    // Set greet
    const hour = model.setGreeting();
    if (hour < 12) app.displayGreet('Good morning');
    if (hour >= 12 && hour < 18) app.displayGreet('Good afternoon');
    else app.displayGreet('Good evening');

    // Get name
    const momentName = model.getName();
    if (momentName === null) app.displayName('[Enter name]');
    else app.displayName(momentName);

    // Get focus
    const momentFocus = model.getFocus();
    if (momentFocus === null) app.displayFocus('[Enter focus]');
    else app.displayFocus(momentFocus);

    // Generate random quote
    const quote = await model.randomQuote();

    // Display the quote to the UI
    if (quote.author === null) app.displayQuote('Joel Nambala', quote.text);
    else app.displayQuote(quote.author, quote.text);

    // Current current location
    navigator.geolocation.getCurrentPosition(async function (position) {
      // Get the latitude and longitude from the coords object
      const { latitude, longitude } = position.coords;

      // Get the city you are currently in
      const city = await model.currentTown(latitude, longitude);

      // Display the city name to the UI
      app.displayCityName(city);

      // Get the current weather
      const data = await model.currentWeather(latitude, longitude);

      // Get the current temperature
      const temp = data.current.temp;

      // Display the temperature to the UI
      app.displayTemperature(temp);
    });
  } catch (err) {
    // Hanlde the error from the model
    console.error(err.message);
  }
};

controller();

momentumName.addEventListener('keypress', model.setName);
momentumName.addEventListener('blur', model.setName);
momentumFocus.addEventListener('keypress', model.setFocus);
momentumFocus.addEventListener('blur', model.setFocus);

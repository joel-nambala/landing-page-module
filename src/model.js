import * as config from './config';
import { momentumName, momentumFocus } from './dom';

// Set time
export const setTime = function () {
  // Current time
  const today = new Date();

  // Format date
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(today);
};

// Set greeting
export const setGreeting = function () {
  // Get the current time
  const today = new Date();

  // Get the current hour
  const hour = today.getHours();

  // Return the hour
  return hour;
};

// Get name
export const getName = function () {
  const name = localStorage.getItem('name');
  return name;
};

// Set name
export const setName = function (e) {
  if (e.type === 'keypress') {
    if (e.key === 'Enter') {
      localStorage.setItem('name', e.target.innerText);
      momentumName.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
};

// Get focus
export const getFocus = function () {
  const focus = localStorage.getItem('focus');
  return focus;
};

// Set focus
export const setFocus = function (e) {
  if (e.type === 'keypress') {
    if (e.key === 'Enter') {
      localStorage.setItem('focus', e.target.innerText);
      momentumFocus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
};

// Get random quote
export const randomQuote = async function () {
  try {
    // AJAX request
    const response = await fetch(config.quoteUrl);

    // Throw the error
    if (!response.ok) throw new Error('Please check your internet connection');

    // Convert the data to JSON
    const data = await response.json();

    // Slice the array
    const dataCopy = data.slice(0, 500);

    // Generate a random integer
    const randomInt = Math.floor(Math.random() * dataCopy.length);

    // Get the quote at the position of the random integer
    const quote = dataCopy[randomInt];

    // Return the quote from the function
    return quote;
  } catch (err) {
    // Throw a the error
    throw err;
  }
};

// Get current town
export const currentTown = async function (lat, lng) {
  try {
    // AJAX request
    const response = await fetch(
      `${config.geoCode}?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );

    // Check for errors
    if (!response.ok) throw new Error('Something went wrong!');

    // Covert the data to a JSON format
    const data = await response.json();

    // Get the current city from the data
    const city = data.city;

    // Return the city name
    return city;
  } catch (err) {
    // Throw the error
    throw err;
  }
};

// Get the current weather
export const currentWeather = async function (lat, lng) {
  try {
    // AJAX call
    const response = await fetch(
      `${config.weatherUrl}?lat=${lat}&lon=${lng}&exclude=hourly,minutely&units=metric&appid=${config.API_KEY}`
    );

    // Check for an error
    if (!response.ok) throw new Error('Something went wrong!!!');

    // Change the data to json format
    const data = response.json();

    // Return the data from the function
    return data;
  } catch (error) {
    // Rethrow the error
    throw error;
  }
};

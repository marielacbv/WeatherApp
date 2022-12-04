// Feature 1: Display the current dae and time using JavaScript: Tuesday 16:00

let dayTime = document.querySelector(".day-time");
let today = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[today.getDay()];
let hours = today.getHours();
let minutes = today.getMinutes();
if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
dayTime.innerHTML = `${day}, ${hours}:${minutes}`;

// Feature 2: Add a search engine, when searching for a city (i.e. Paris),
// display the city name on the page after the user submits the for

// When the Web runs

function displayTemp(response) {
  let temperature = Math.round(response.data.main.temp);

  document.getElementById("current-temp").innerHTML = Math.round(temperature);
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  console.log(response.data.name);
}

function currentPosition(position) {
  let apiKey = "cfb51fc5dbb4cbe2d0268e3189a05c67";
  let units = "metric";

  // Coordinates
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemp);
}

function searchPosition(city) {
  // API whather key
  let apiKey = "cfb51fc5dbb4cbe2d0268e3189a05c67";
  let units = "metric";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search");

  if (city.value) {
    //navigator.geolocation.getCurrentPosition(searchPosition(city.value));
    searchPosition(city.value);
  } else {
    navigator.geolocation.getCurrentPosition(currentPosition);
    alert("Please type a city!");
  }
}

searchPosition("New York");
let searcher = document.querySelector(".searcher");
searcher.addEventListener("submit", handleSubmit);
let searchBtn = document.querySelector("#button-addon1");
searchBtn.addEventListener("click", handleSubmit);

// Bonus Feature: Display a fake temperature (i.e 17) in
//Celsius and add a link to convert it to Fahrenheit. When clicking on it,
// it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.
// missing: change c and f colours when selectes
// missing: update monday to friday degrees

var temp = 24;
document.getElementById("current-temp").innerHTML = temp;
let celTag = true;
let farTag = false;

function cel2far(event) {
  event.preventDefault();
  if (celTag) {
    temp = (temp * 9) / 5 + 32;
    document.getElementById("current-temp").innerHTML = Math.round(temp);
    celTag = false;
    farTag = true;
  }
}

function far2cel(event) {
  event.preventDefault();
  if (farTag) {
    temp = (temp - 32) * (5 / 9);
    document.getElementById("current-temp").innerHTML = Math.round(temp);
    celTag = true;
    farTag = false;
  }
}

let farenheit = document.querySelector(".far");
let celsius = document.querySelector(".cent");
farenheit.addEventListener("click", cel2far);
celsius.addEventListener("click", far2cel);

// Button Current: Displays current location

function displayCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentBtn = document.querySelector("#btn-current");
currentBtn.addEventListener("click", displayCurrent);

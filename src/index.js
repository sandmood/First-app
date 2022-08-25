let currentTime = new Date();
let hour = currentTime.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let dates = currentTime.getDate();
let years = currentTime.getFullYear();

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let month = months[currentTime.getMonth()];
time.innerHTML = `${hour}:${minutes}`;
date.innerHTML = `${dates} ${month} ${years}`;

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let currentDay = days[currentTime.getDay()];
today.innerHTML = `${currentDay}`;

let formcity = document.querySelector("#form-input");
let cityInput = document.querySelector("#city-input");

function search(event) {
  event.preventDefault();
  let apiKey = "f508d428d047ff2cc7eb9c220e59f456";
  let city = document.querySelector("#form-city");
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  city.innerHTML = `${cityInput.value}`;
  axios.get(apiUrl).then(showTemp);
}
formcity.addEventListener("submit", search);

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let showtemper = document.querySelector("#realtemp");
  showtemper.innerHTML = `${temperature}`;

  let city = document.querySelector("#form-city");
  city.innerHTML = response.data.name;
}

//function convertToFahr(event) {
//event.preventDefault();
//let temper = document.querySelector("#realtemp");
//temper.innerHTML = 104;
//}
//let fahrTemp = document.querySelector("#fahr-link");
//fahrTemp.addEventListener("click", convertToFahr);

//function convertToCel(event) {
//event.preventDefault();
//let temper = document.querySelector("#realtemp");
//temper.innerHTML = 30;
//}
//let celTemp = document.querySelector("#celsius-link");
//celTemp.addEventListener("click", convertToCel);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "f508d428d047ff2cc7eb9c220e59f456";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  axios.get(apiUrl).then(showTemp);
}

let currentLocation = document.querySelector("#current");

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
currentLocation.addEventListener("click", getCurrentPosition);

function showCurrentCity(response) {
  let apiKey = "f508d428d047ff2cc7eb9c220e59f456";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  let city = (document.querySelector("#form-city").innerHTML =
    response.data.name);
  axios.get(apiUrl).then(showCurrentCity);
}

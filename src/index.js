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
  "December",
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
  "Saturday",
];
let currentDay = days[currentTime.getDay()];
today.innerHTML = `${currentDay}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Thursday",
    "Wednesday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastEl = document.querySelector("#forecast");
  let forecastHTML = `<div class="row gx-0">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
          <div class="card" style="width: 123px; height: auto;">
            <div class="card-header">${formatDay(forecastDay.dt)}</div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"  width="50"></i>
              </li>
              <li class="list-group-item">
                <span class="max-temp">${Math.round(
                  forecastDay.temp.max
                )}°</span>
                <span class="min-temp"> ${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </li>
            </ul>
            </div>
          </div>
        `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastEl.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "f508d428d047ff2cc7eb9c220e59f456";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showTemp(response) {
  celsiusTemp = response.data.main.temp;
  document.querySelector(`#realtemp`).innerHTML = `${Math.round(celsiusTemp)}`;
  let city = document.querySelector("#form-city");
  city.innerHTML = response.data.name;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

let apiKey = "f508d428d047ff2cc7eb9c220e59f456";
let city = "London";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(showTemp);

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiKey = "f508d428d047ff2cc7eb9c220e59f456";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemp);
}

let formSearch = document.querySelector("#form-search");
formSearch.addEventListener("submit", searchCity);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "f508d428d047ff2cc7eb9c220e59f456";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

let currentLocation = document.querySelector("#current");

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
currentLocation.addEventListener("click", getCurrentPosition);

function convertFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#realtemp");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = `${Math.round(fahrenheitTemp)}`;
}

function convertCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#realtemp");
  tempElement.innerHTML = `${Math.round(celsiusTemp)}`;
}

let celsiusTemp = null;

document
  .querySelector(`#fahr-link`)
  .addEventListener("click", convertFahrenheit);

document
  .querySelector("#celsius-link")
  .addEventListener("click", convertCelsius);

function searchCity(city) {
  let apiKey = "a03b08ef2bbd7f607a82ffef2t4o4bc4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}
function refreshWeather(response) {
  let tempratureElement = document.querySelector("#temprature");
  let temprature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humudityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" alt="" />`;
  humudityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/hr`;
  descriptionElement.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;
  tempratureElement.innerHTML = Math.round(temprature);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function handleSearchSubmitt(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmitt);

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHTML = "";
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="weather-forecast-day">
            <div class="weather-forecast-date">Tue</div>
            <div class="weather-forecast-icon">☁</div>
            <div class="weather-forecast-tempratures">
              <div class="weather-forecast-temprature">
                <strong>15&deg;</strong>
              </div>
              <div class="weather-forecast-temprature">9&deg;</div>
            </div>
          </div>`;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}
displayForecast();

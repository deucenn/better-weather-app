import callWeatherApi from "./API";
import { FahrenheitToCelsius, MphToKmh } from "./Conversion";
import { getWeatherIcon, getCardinalDirection } from "./HelperFunctions";

const locationInput = document.querySelector(".search-input");
const locationInputBtn = document.querySelector(".search-submit");
const city = document.querySelector(".data-city");
const cityDetails = document.querySelector(".data-location-details");
const temp = document.querySelector(".data-temp");
const tempDesc = document.querySelector(".data-temp-desc");
const minTemp = document.querySelector(".data-info-min-temp");
const maxTemp = document.querySelector(".data-info-max-temp");
const humidity = document.querySelector(".data-info-humidity");
const sunrise = document.querySelector(".data-info-sunrise");
const sunset = document.querySelector(".data-info-sunset");
const uvIndex = document.querySelector(".data-info-uv-index");
const pressure = document.querySelector(".data-info-pressure");
const windDirection = document.querySelector(".data-info-wind-direction");
const windSpeed = document.querySelector(".data-info-wind-speed");
const tomorrowMaxTemp = document.querySelector(".data-tomorrow-max-temp");
const tomorrowMinTemp = document.querySelector(".data-tomorrow-min-temp");
const overtomorrowMaxTemp = document.querySelector(
  ".data-overtomorrow-max-temp"
);
const overtomorrowMinTemp = document.querySelector(
  ".data-overtomorrow-min-temp"
);

function updateWeatherUI(data) {
  const [hourSunrise, minuteSunrise] = data.sunrise.split(":");
  const [hourSunset, minuteSunset] = data.sunset.split(":");

  // Update the UI with the fetched data
  city.innerHTML = `<h1>${data.city}</h1>`;
  cityDetails.innerHTML = `N${data.latitude}° E${data.longitude}°`;
  temp.innerHTML = `<h1>${getWeatherIcon(data.icon)} ${FahrenheitToCelsius(
    data.temp
  )}°C</h1>`;
  tempDesc.innerHTML = `
    <p>Feels like ${FahrenheitToCelsius(data.feelsLike)}°C</p>
    <p>${data.conditions}</p>`;

  minTemp.innerHTML = `
      <h3>Min. Temperature</h3>
      <h4>${FahrenheitToCelsius(data.tempMin)}°C</h4>`;

  maxTemp.innerHTML = `
      <h3>Max. Temperature</h3>
      <h4>${FahrenheitToCelsius(data.tempMax)}°C</h4>`;

  humidity.innerHTML = `
      <h3>Humidity</h3>
      <h4>${data.humidity}%</h4>`;

  sunrise.innerHTML = `
      <h3>Sunrise</h3>
      <h4>${hourSunrise}:${minuteSunrise}</h4>`;

  sunset.innerHTML = `
      <h3>Sunset</h3>
      <h4>${hourSunset}:${minuteSunset}</h4>`;

  uvIndex.innerHTML = `
      <h3>UV Index</h3>
      <h4>${data.uvIndex}</h4>`;

  pressure.innerHTML = `
      <h3>Pressure</h3>
      <h4>${data.pressure} hPa</h4>`;

  windDirection.innerHTML = `
      <h3>Wind Direction</h3>
      <h4>${getCardinalDirection(data.windDirection)}</h4>`;

  windSpeed.innerHTML = `
      <h3>Wind Speed</h3>
      <h4>${MphToKmh(data.windSpeed)} km/h</h4>`;

  tomorrowMaxTemp.innerHTML = `
        ${getWeatherIcon(data.tomorrowIcon)} ${FahrenheitToCelsius(
    data.tomorrowMaxTemp
  )}°C`;

  tomorrowMinTemp.innerHTML = `${FahrenheitToCelsius(data.tomorrowMinTemp)}°C`;

  overtomorrowMaxTemp.innerHTML = `${getWeatherIcon(
    data.overtomorrowIcon
  )} ${FahrenheitToCelsius(data.overtomorrowMaxTemp)}°C`;

  overtomorrowMinTemp.innerHTML = `${FahrenheitToCelsius(
    data.overtomorrowMinTemp
  )}°C`;
}

export default function Weather() {
  const defaultLocation = "Solingen";
  callWeatherApi(defaultLocation)()
    .then(updateWeatherUI)
    .catch((error) => {
      console.error("Error fetching weather data for default location:", error);
    });
  locationInputBtn.addEventListener("click", () => {
    const location = locationInput.value;
    callWeatherApi(location)()
      .then(updateWeatherUI)
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  });
}

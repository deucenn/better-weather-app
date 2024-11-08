import callWeatherApi from "./API";

function getWeatherIcon(desc) {
    if (desc === "snow") return `<i class="fa-solid fa-snowflake"></i>`; // North
    else if (desc === "rain") return `<i class="fa-solid fa-cloud-showers-heavy"></i>`; // East
    else if (desc === "fog") return `<i class="fa-solid fa-smog"></i>`; // South
    else if (desc === "wind") return `<i class="fa-solid fa-wind"></i>`; // West
    else if (desc === "cloudy") return `<i class="fa-solid fa-cloud"></i>`; // West
    else if (desc === "partly-cloudy-day") return `<i class="fa-solid fa-cloud-sun"></i>`; // West
    else if (desc === "partly-cloudy-night") return `<i class="fa-solid fa-cloud-moon"></i>`; // West
    else if (desc === "clear-day") return `<i class="fa-solid fa-sun"></i>`; // West
    else if (desc === "clear-night") return `<i class="fa-solid fa-moon"></i>`; // West
    return `<i class="fas fa-question-circle"></i>`; // Unknown direction
  }

  function getCardinalDirection(degrees) {
    if (degrees >= 0 && degrees < 90)
      return `<i class="fas fa-arrow-up"></i>`; // North
    else if (degrees >= 90 && degrees < 180)
      return `<i class="fas fa-arrow-right"></i>`; // East
    else if (degrees >= 180 && degrees < 270)
      return `<i class="fas fa-arrow-down"></i>`; // South
    else if (degrees >= 270 && degrees < 360)
      return `<i class="fas fa-arrow-left"></i>`; // West
    return `<i class="fas fa-question-circle"></i>`; // Unknown direction
  }

  export { getWeatherIcon, getCardinalDirection }
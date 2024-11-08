const today = new Date().toISOString().split("T")[0];

// TODO: hide API key
const key = "7H4V8WCPUESCS4VBH4K7LDZF8";

export default function callWeatherApi (location) {
  async function getLocalData() {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${key}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const locationData = await response.json();

      if (locationData.days && locationData.days.length > 0) {
        const processedData = {
          city: locationData.resolvedAddress,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          temp: locationData.days[0].temp,
          tempDescription: locationData.description,
          tempMin: locationData.days[0].tempmin,
          tempMax: locationData.days[0].tempmax,
          conditions: locationData.days[0].conditions,
          feelsLike: locationData.days[0].feelslike,
          humidity: locationData.days[0].humidity,
          sunrise: locationData.days[0].sunrise,
          sunset: locationData.days[0].sunset,
          uvIndex: locationData.days[0].uvindex,
          pressure: locationData.days[0].pressure,
          windDirection: locationData.days[0].winddir,
          windSpeed: locationData.days[0].windspeed,
          tomorrowMaxTemp: locationData.days[1] ? locationData.days[1].tempmax : "N/A",
          tomorrowMinTemp: locationData.days[1] ? locationData.days[1].tempmin : "N/A",
          tomorrowConditions: locationData.days[1] ? locationData.days[1].conditions : "N/A",
          overtomorrowMaxTemp: locationData.days[2] ? locationData.days[2].tempmax : "N/A",
          overtomorrowMinTemp: locationData.days[2] ? locationData.days[2].tempmin : "N/A",
          overtomorrowConditions: locationData.days[2] ? locationData.days[2].conditions : "N/A",
        };

        return processedData; 
      } else {
        throw new Error("No days data available in the response.");
      }

    } catch (error) {
      console.error("Error fetching weather data:", error);
      return { error: "Invalid location or network error" };
    }
  }

  return getLocalData;
}

// Just for testing purposes
// const getWeatherData = callWeatherApi("Amsterdam"); 
// getWeatherData().then(data => {
//   console.log(data); 
// });

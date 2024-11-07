// Get current date in YYYY-MM-DD format
const today = new Date().toISOString().split("T")[0];

const key = "7H4V8WCPUESCS4VBH4K7LDZF8";

export default function ApiCall(location) {
  async function getLocalData() {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${today}?key=${key}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const locationData = await response.json();

      // Process the location data
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
        tomorrowMaxTemp: locationData.days[1].tempmax,
        tomorrowMinTemp: locationData.days[1].tempmin,
        tomorrowConditions: locationData.days[1].conditions,
        overtomorrowMaxTemp: locationData.days[2].tempmax,
        overtomorrowMinTemp: locationData.days[2].tempmin,
        overtomorrowConditions: locationData.days[2].conditions,
      };

      return processedData; // Return the processed data
    } catch (error) {
      alert("Something went wrong!");
      console.error("Error fetching weather data:", error);
      return { error: "Invalid location or network error" };
    }
  }

  return getLocalData;
}


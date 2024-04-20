import React, { useState } from "react";
import axios from "axios";

const WeatherApp = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState("");

  // Function to get the user Input
  const handleChange = (e) => {
    setCity(e.target.value);
  };

  // Function to add the entered city to the cities array
  const handleAdd = () => {
    if (city.length > 0) {
      setCities((prevCities) => [...prevCities, city]);
      setCity("");
    }
  };

  // Get Weather Button will call the openWeather API with all the entered cities and then store the response in a weatherDataList
  const handleSubmit = async () => {
    try {
      const promises = cities.map(async (city) => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
          );
          if (response.status === 200) {
            return response.data;
          } else {
            throw new Error("Failed to fetch data");
          }
        } catch (error) {
          // Log the error or handle it as needed
          console.error("Error fetching weather data for", city, ":", error);
          return null; // Return null for rejected promises
        }
      });
      const resolvedPromises = await Promise.all(promises);
      const weatherDataList = resolvedPromises.filter((data) => data !== null);
      setWeatherData(weatherDataList);
      setError("");
    } catch (error) {
      setError("One of your cities is not valid");
      console.error("Error fetching weather data:", error);
    }
  };

  // Resetting all the data and error
  const handleReset = () => {
    setCities([]);
    setWeatherData([]);
    setError("");
  };

  // Implementing a Google Search for the Recommended City
  const handleCitySearch = (cityName) => {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
      cityName
    )}`;
    window.open(searchUrl, "_blank");
  };

  // Function to remove the entered cities by the user
  const handleRemoveCity = (index) => {
    setError("");
    const updatedCities = cities.filter((_, i) => i !== index);
    setCities(updatedCities);
  };

  const renderWeather = () => {
    // Create an array to store city weather details
    const cityWeatherDetails = [];

    // Iterate over weather data for each city
    weatherData.forEach((data, index) => {
      // Extract relevant weather details
      const cityWeather = {
        city: data.name || "",
        temperature: data.main.temp || "",
        description: data.weather[0].description || "",
        humidity: data.main.humidity || "",
        windSpeed: data.wind.speed || "",
      };

      // Add city weather details to the array
      cityWeatherDetails.push(cityWeather);
    });

    // Sort the city weather details by temperature (ascending order)
    cityWeatherDetails.sort((a, b) => a.temperature - b.temperature);

    // Display weather details and recommendation
    return (
      <div>
        <div className="flex flex-row flex-wrap items-center justify-center mt-4 space-x-4">
          {cityWeatherDetails.map((cityWeather, index) => (
            <div
              key={index}
              className="bg-gray-200 p-4 rounded-md shadow-md mb-4 space-x-2 cursor-pointer"
            >
              <h2 className="text-lg font-semibold capitalize">
                Weather in {cityWeather.city}
              </h2>
              <p className="text-gray-800">
                Temperature: {cityWeather.temperature} °C
              </p>
              <p className="text-gray-800">
                Description: {cityWeather.description}
              </p>
              <p className="text-gray-800">Humidity: {cityWeather.humidity}%</p>
              <p className="text-gray-800">
                Wind Speed: {cityWeather.windSpeed} m/s
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Best City for Travel:</h3>
          <p className="text-gray-800">
            Based on weather conditions, we recommend visiting{" "}
            <span
              className="font-semibold capitalize bg-emerald-400 p-2 rounded-md text-white cursor-pointer"
              onClick={() => handleCitySearch(cityWeatherDetails[0].city)}
            >
              {cityWeatherDetails[0].city}
            </span>
          </p>
        </div>

        <button
          className="bg-red-600 text-white mt-2 px-4 py-2 rounded-md"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-4">
        <input
          type="text"
          className="p-2 mr-2 border-2 rounded-md"
          value={city}
          onChange={handleChange}
          placeholder="Enter your destination"
        />
        <button
          type="button"
          className="bg-black text-white text-xl rounded-full w-10 h-10"
          onClick={handleAdd}
        >
          +
        </button>
      </div>

      {weatherData.length === 0 && (
        <div>
          {cities.length > 0 ? (
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Your Entered Cities:
              </h3>
              <ul className="flex space-x-4 flex-wrap items-center list-none ml-6">
                {cities.map((city, index) => (
                  <li
                    className="flex items-center justify-center capitalize bg-blue-200 px-4 rounded-md shadow-md cursor-pointer"
                    key={index}
                  >
                    {city}
                    <button
                      className="ml-auto pl-2 py-1 text-red-600 text-sm"
                      onClick={() => handleRemoveCity(index)}
                    >
                      x
                    </button>
                  </li>
                ))}
              </ul>
              {error && <div className="text-red-600 my-2">{error}</div>}
              <button
                className="bg-green-600 text-white mt-4 px-4 py-2 rounded-md"
                onClick={handleSubmit}
              >
                Get Weather
              </button>
            </div>
          ) : (
            <div className="text-gray-600">
              You don't have any cities added.
            </div>
          )}
        </div>
      )}

      {weatherData.length > 0 && renderWeather()}
    </div>
  );
};

export default WeatherApp;

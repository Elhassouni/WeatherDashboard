import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";
import debounce from "lodash.debounce";

function Forcast({ icon, weather, setCity }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState({});

  // I used this Debounced search function to fetch weather data to instantly update the weather data q
  const search = useCallback(
    debounce((city) => {
      axios
        .get(`/api/weather?city=${city}`)
        .then((response) => {
          // Update weather data and clear errors
          setWeatherData(response.data);
          setError("");
          
          setCity(city); // Update the city in the parent component this was pain in the ass for to figure it out
        })
        .catch((error) => {
          console.log(error);
          setWeatherData({});
          setError({ message: "Not Found", query: city });
        });
    }, 500),
    [setCity]
  );

  useEffect(() => {
    search("Taounate");
  }, [search]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    search(e.target.value);
  };

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  return (
    <div className="forecast">
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
      <div className="today-weather">
        <h3>{weather}</h3>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search any city"
            onChange={handleInputChange}
            value={query}
          />
          <div className="img-box">
            <img
              src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
              alt="Search"
              onClick={() => search(query)}
            />
          </div>
        </div>
        <ul>
          {typeof weatherData.main != "undefined" ? (
            <div>
              <li className="cityHead">
                <p>
                  {weatherData.name}, {weatherData.sys.country}
                </p>
                <img
                  className="temp"
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                  alt="Weather icon"
                />
              </li>
              <li>
                Temperature{" "}
                <span className="temp">
                  {Math.round(weatherData.main.temp)}°c ({weatherData.weather[0].main})
                </span>
              </li>
              <li>
                Humidity{" "}
                <span className="temp">
                  {Math.round(weatherData.main.humidity)}%
                </span>
              </li>
              <li>
                Visibility{" "}
                <span className="temp">
                  {Math.round(weatherData.visibility)} mi
                </span>
              </li>
              <li>
                Wind Speed{" "}
                <span className="temp">
                  {Math.round(weatherData.wind.speed)} Km/h
                </span>
              </li>
            </div>
          ) : (
            <li>
              {error.query} {error.message}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Forcast;
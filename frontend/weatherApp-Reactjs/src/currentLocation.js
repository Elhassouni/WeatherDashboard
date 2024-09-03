import React, { useState, useEffect } from "react";
import Clock from "react-live-clock";
import Forcast from "./forcast";
import loader from "./images/WeatherIcons.gif";
import ReactAnimatedWeather from "react-animated-weather";
import axios from "axios";

const dateBuilder = (d) => {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};

const defaults = {
  color: "white",
  size: 112,
  animate: true,
};

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getWeather, handleLocationError);
    } else { 
      setError("Geolocation is not supported by this browser.");
    }
  };

  const handleLocationError = (error) => {
    setError("Unable to retrieve your location. Using default location.");
    getWeather({ coords: { latitude: 28.67, longitude: 77.22 } });
  };

  const getWeather = async (position) => {
    try {
      const response = await axios.get(`/api/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
      const data = response.data;
      setWeatherData({
        city: data.name,
        country: data.sys.country,
        temperatureC: Math.round(data.main.temp),
        humidity: data.main.humidity,
        main: data.weather[0].main,
        icon: getWeatherIcon(data.weather[0].main),
      });
    } catch (error) {
      setError("Error fetching weather data.");
    }
  };

  const getWeatherIcon = (main) => {
    switch (main) {
      case "Haze":
        return "CLEAR_DAY";
      case "Clouds":
        return "CLOUDY";
      case "Rain":
        return "RAIN";
      case "Snow":
        return "SNOW";
      case "Dust":
        return "WIND";
      case "Drizzle":
        return "SLEET";
      case "Fog":
      case "Smoke":
        return "FOG";
      case "Tornado":
        return "WIND";
      default:
        return "CLEAR_DAY";
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!weatherData) {
    return (
      <React.Fragment>
        <img src={loader} style={{ width: "50%", WebkitUserDrag: "none" }} alt="Loading..." />
        <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
          Detecting your location
        </h3>
        <h3 style={{ color: "white", marginTop: "10px" }}>
          Your current location will be displayed on the App <br></br> & used
          for calculating Real time weather.
        </h3>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="city">
        <div className="title">
          <h2>{weatherData.city}</h2>
          <h3>{weatherData.country}</h3>
        </div>
        <div className="mb-icon">
          <ReactAnimatedWeather
            icon={weatherData.icon}
            color={defaults.color}
            size={defaults.size}
            animate={defaults.animate}
          />
          <p>{weatherData.main}</p>
        </div>
        <div className="date-time">
          <div className="dmy">
            <div id="txt"></div>
            <div className="current-time">
              <Clock format="HH:mm:ss" interval={1000} ticking={true} />
            </div>
            <div className="current-date">{dateBuilder(new Date())}</div>
          </div>
          <div className="temperature">
            <p>
              {weatherData.temperatureC}°<span>C</span>
            </p>
          </div>
        </div>
      </div>
      <Forcast icon={weatherData.icon} weather={weatherData.main} />
    </React.Fragment>
  );
}

export default Weather;
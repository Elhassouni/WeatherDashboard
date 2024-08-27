import React, { useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [address, setAddress] = useState('taounate');
  const [loading, setLoading] = useState(false);

  const getWeather = async (city) => { 
    try {
      setLoading(true); 
      const response = await fetch(`http://localhost:5000/api/weather?city=${city}&units=metric`);
      const data = await response.json();

      if (response.ok) {
        setData(data);
        console.log(data);
      } else {
        setData(null);
      }
    } catch (err) {
      setData(null);
      console.error("Error fetching weather data:", err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      const city = e.target.value.trim(); 
      setAddress(city); 
      getWeather(city); 
    }
  };
  
  return (
    <>
      <h1>Weather Dashboard App</h1>
      <input 
        type='text'
        placeholder='Enter a city'
        onKeyDown={handleChange}
      />
      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        <>
        <h2>City: {data.city}</h2>
        <h3>Conditions: {data.conditions}</h3>
        <img
          style={{ width: '50px', height: '50px' }}
          src={`http://openweathermap.org/img/w/${data.icon}.png`}
          alt="Weather icon"
        />
        <h3>Temperature: {data.temperature} °C</h3></>
      ) : (
        <p>Search weather by city name</p>
      )}
    </>
  );
}

export default App;

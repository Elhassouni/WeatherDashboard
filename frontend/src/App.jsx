import React, { useEffect, useState } from 'react'

function App() {
  const [data,setData] = useState(null)
 
  const getWeather = async () => {
    const city = 'fez' 
    try {
      const response = await fetch(`http://localhost:5000/api/weather?city=${city}&units=metric`);
      const data = await response.json();

      if (response.ok) {
        setData(data);
        console.log(data)
      } else {
        
        setData(null);
      }
    } catch (err) {
      
      setData(null);
    }
  };
  useEffect(()=>{
   getWeather();
   
  },[])
  return (
    <>
    <h1>weather dashboard app</h1>
    <h2>city:{data.city}</h2>
    <h3>conditions:{data.conditions}</h3>
    <img src={`http://openweathermap.org/img/w/${data.icon}.png`}alt="" />
    <h3>temperature:{data.temperature}</h3>
    </>
  )
}

export default App
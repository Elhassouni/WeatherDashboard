import React from "react";
import CurrentLocation from "./currentLocation";

// Author ayoub Elhassouni
// Alx-Africa
// Code STD1522351
 
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <CurrentLocation />
      </div>
      <div className="footer-info">
        {/* You may want to update or remove this footer information */}
        Developed by Ayoub El-Hassouni | Powered by React & Flask & gunicorn & axios & nginx
      </div>
    </React.Fragment>
  );
}

export default App;
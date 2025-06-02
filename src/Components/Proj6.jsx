import React, { useState } from "react";
import '../assets/Css/WeatherApp.css';

const API_KEY = "190774ba47fa9865df3d765795e32d5d";

const Proj6 = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = () => {
    if (!city) return;

    setLoading(true);
    setError("");
    setWeather(null);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("City not found");
        return res.json();
      })
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="weather-container">
      <h2 className="title">Weather App</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input-field"
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
        />
        <button onClick={fetchWeather} className="fetch-btn">
          Get Weather
        </button>
      </div>

      {loading && <p className="loading">Loading weather...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h3>
            {weather.name}, {weather.sys.country}
          </h3>
          <p className="temp">{weather.main.temp}°C</p>
          <p className="desc">{weather.weather[0].description}</p>
          <p>
            Humidity: {weather.main.humidity}% | Wind: {weather.wind.speed} m/s
          </p>
        </div>
      )}
    </div>
  );
};


export default Proj6;

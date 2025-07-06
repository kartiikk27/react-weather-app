import React, { useState, useEffect } from "react";

const API_KEY = "897cafdf2770389b373c7e7a7dbb4841"; 

function App() {
  const [city, setCity] = useState("Delhi");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async (cityName) => {
    try {
      setError("");
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) {
        throw new Error("City not found");
      }
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <div style={styles.container}>
      <h1>🌤️ Live Weather App</h1>

      <form onSubmit={handleSubmit}>
        <input
          style={styles.input}
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button style={styles.button}>Get Weather</button>
      </form>

      {error && <p style={styles.error}>{error}</p>}

      {weather && (
        <div style={styles.card}>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>🌡 Temp: {weather.main.temp}°C</p>
          <p>🌬 Wind: {weather.wind.speed} m/s</p>
          <p>☁️ Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial",
    textAlign: "center",
    padding: "2rem",
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
    width: "200px",
    marginRight: "10px",
  },
  button: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    cursor: "pointer",
  },
  card: {
    marginTop: "2rem",
    padding: "1rem",
    background: "#e0f7fa",
    borderRadius: "8px",
    display: "inline-block",
  },
  error: {
    color: "red",
    marginTop: "1rem",
  },
};

export default App;

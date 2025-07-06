import React, { useState } from "react";

const API_KEY = "94bf8330dcf8f9e6b0c667121f00b640"; // Replace with your actual API key

function App() {
  const [city, setCity] = useState("Delhi");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    setWeather(null);

   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
console.log("FETCH URL:", url);
// DEBUGGING HELP

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div style={styles.container}>
      <h1>🌤️ Live Weather App</h1>
      <form onSubmit={handleSubmit} aria-label="weather search form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          style={styles.input}
        />
        <button style={styles.button}>Get Weather</button>
      </form>

      {loading && <p><em>Loading...</em></p>}
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
    fontFamily: "Arial, sans-serif",
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

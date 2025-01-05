import React, { useState, useEffect } from 'react';

const WeatherApp = () => {
    const [city, setCity] = useState('London');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeather = async (cityName) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=14c1286a36096879a7e4c6168e255c3a`
            );
            const data = await response.json();

            if (data.cod === 200) {
                setWeatherData(data);
            } else {
                setError(data.message);
                setWeatherData(null);
            }
        } catch (fetchError) {
            setError('Error fetching data. Please try again.');
        }

        setLoading(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (city.trim()) {
            fetchWeather(city);
        } else {
            setError('City name cannot be empty.');
        }
    };

    return (
        <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
            <h1>Weather App</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{
                        padding: '10px',
                        fontSize: '16px',
                        marginRight: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        borderRadius: '5px',
                        border: 'none',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        cursor: 'pointer',
                    }}
                >
                    Search
                </button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {weatherData && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Weather in {weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Feels like: {weatherData.main.feels_like}°C</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Wind speed: {weatherData.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;

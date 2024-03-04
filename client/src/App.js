import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const weatherIcons = {
  Clear: 'clear.png',
  Clouds: 'cloudy.png',
  Rain: 'rain.png',
  Smoke: 'smoke.png',
  Thunderstorm: 'thunderstorm.png',
  Drizzle: 'drizzle.png',
  Snow: 'snow.png',
  Mist: 'mist.png',
  Haze: 'haze.png',
  Dust: 'dust.png',
  Fog: 'fog.png',
  Tornado: 'tornado.png'
 
};
function App() {
  const [city, setCity] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [search, setSearch] = useState("Mumbai");

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(`https://weather-forecast-7hrm.onrender.com/?city=${search}`);
        const { weather, forecast } = response.data;
        setCity(weather);
        setForecast(forecast);
      } catch (error) {
        console.error('Error fetching weather data:', error.message);
        setCity(null);
        setForecast(null);
      }
    }
  
    if (search) { // Fetch only if search is not empty
      fetchWeatherData();
    }
  }, [search]);
  

  const handleSearch = (event) => {
    setSearch(event.target.previousSibling.value);
  };


  

   const formatTime = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000); 
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
       <div className="main2">
        <div className="header">
          <p>Weathercast.com</p>
          <input type="text" placeholder='Search your city...' />
          <button onClick={handleSearch}>Search</button>
        </div>
{!city ? (
  <p style={{margin:"80px", fontSize:"22px"}}>No data found! Please enter correct City Name</p>
) : (

        <div className="main2">

          <div className="box box1">
            <div class="weather-container">
              <div class="weather-header">
              <img src={`../assets/${weatherIcons[city.weather[0].main]}`} alt="Weather Icon" />
                <h1 class="city-name">{search}</h1>
                <p class="weather-description">{city.weather[0].main}</p>
              </div>
              <div class="weather-details">
                <div class="temperature">{Math.round(city.main.temp - 273.15)}°C</div>
              </div>
            </div>
          </div>

          <div className="box">
            <div className="other-info">
              <div className="small-box">
              <img src="../assets/humidity.png" alt="" />
                <p>Humidity</p>
                <p>{city.main.humidity}%</p>
              </div>
              <div className="small-box">
              <img src="../assets/airpressure.png" alt="" />
                <p>Pressure</p>
                <p>{city.main.pressure} hPa</p>
              </div>
              <div className="small-box">
              <img src="../assets/wind.png" alt="" />
                <p>Wind</p>
                <p>{city.wind.speed} km/h</p>
              </div>
              <div className="small-box">
              <img src="../assets/visibility.png" alt="" />
                <p>Visibility</p>
                <p>{city.visibility / 1000} km</p>
              </div>
              <div className="small-box">
              <img src="../assets/feelslike.png" alt="" />
                <p>Feels like</p>
                <p>{Math.round(city.main.feels_like - 273.15)}°C</p>
              </div>
              <div className="small-box">
              <img src="../assets/cloud.png" alt="" />
                <p>Clouds</p>
                <p>{city.clouds.all}%</p>
              </div>
            </div>
          </div>

          <div className="box box3">
  <div className="other-info">
    <div className="small-box">
    <img src="../assets/low-temperature.png" alt="" />
      <p>Lowest temp</p>
      <p>{Math.round(city.main.temp_min - 273.15)}°C</p>
    </div>
    <div className="small-box">
    <img src="../assets/high-temperature.png" alt="" />
      <p>Highest temp</p>
      <p>{Math.round(city.main.temp_max - 273.15)}°C</p>
    </div>
    <div className="small-box">
    <img src="../assets/sunrise.png" alt="" />
      <p>Sunrise</p>
      <p>{formatTime(city.sys.sunrise)}</p>
      
    </div>
    <div className="small-box">
    <img src="../assets/sunset.png" alt="" />
      <p>Sunset</p>
      <p>{formatTime(city.sys.sunset)}</p>
     
    </div>
  </div>
</div>

          <div className="box"> 
          <div className="other-info">
          {forecast && forecast.map((item, index) => (
                  <div className="small-box" key={index}>
                    <img src={`../assets/${weatherIcons[item.weather[0].main]}`} alt="Weather Icon" />
                    <p>{new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long', month: 'long',day: '2-digit'})}</p>

                    <p>{Math.round(item.main.temp - 273.15)}°C</p>
                  </div>
                ))}
            </div>
            </div>
        </div>

)}
      </div>
    </>
  );
}

export default App;

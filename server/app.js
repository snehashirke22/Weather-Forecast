const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000; 
const corsOptions = {
  origin: "https://weathercast-w4u2.onrender.com", // frontend URI (ReactJS)
}
app.use(cors(corsOptions));
app.get('/', async (req, res) => {
  try {
    const city = req.query.city;
    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=996aba8913bc4d9d67ba883e3dd27428`;
    const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=996aba8913bc4d9d67ba883e3dd27428`;
    

    const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get(weatherUrl),
        axios.get(forecastUrl)
      ]);
 
      const weatherData = weatherResponse.data;
      const forecastData = forecastResponse.data;
     
    if (weatherData.cod !== 200) {
      return res.status(weatherData.cod).json({ error: 'City not found' });
    }

    // Filter forecast data here
    const filteredForecast = forecastData.list.filter((item, index, arr) => {
      const date = new Date(item.dt_txt).getDate();
      return index === arr.findIndex(obj => new Date(obj.dt_txt).getDate() === date);
    });

    res.json({ weather: weatherData, forecast: filteredForecast});
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

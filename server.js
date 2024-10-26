const express = require('express');
const fetch = require('node-fetch'); // For server-side fetch
const app = express();
const PORT = 3000;

const apiKey = 'd29b4ca5a4a749a27dce066d15344904 '; // Your OpenWeatherMap API key

app.get('/weather', async (req, res) => {
  const cityName = req.query.city;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod !== 200) {
      // Send error response if city not found
      return res.status(404).json({ error: data.message });
    }

    // Send temperature and description back to the client
    res.json({
      temp: data.main.temp,
      description: data.weather[0].description
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

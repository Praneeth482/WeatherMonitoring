async function getWeather() {
  const cityName = document.getElementById("cityInput").value;
  if (!cityName) {
    alert("Please enter a city name");
    return;
  }

  const response = await fetch(`/weather?city=${cityName}`);
  const data = await response.json();

  const weatherDisplay = document.getElementById("weatherDisplay");
  if (data.error) {
    weatherDisplay.textContent = data.error;
  } else {
    const temp = data.temp;
    const description = data.description;
    weatherDisplay.textContent = `The temperature in ${cityName} is ${temp}°C with ${description}.`;
  }
}

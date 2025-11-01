const apiKey = "5696638ff0a65d143e5bc14139161e3b";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const weatherImage = document.getElementById("weatherImage");

const clouds = document.getElementById("clouds");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feelsLike");
const visibility = document.getElementById("visibility");

const weatherSummary = document.getElementById("weatherSummary");
const errorContainer = document.getElementById("errorContainer");
const errorText = document.getElementById("errorText");
const errorImage = document.getElementById("errorImage");
const historyList = document.getElementById("historyList");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const historyUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      showError("City not found. Please try again!");
      return;
    }

    const data = await response.json();
    showWeather(data);
    errorContainer.style.display = "none";

    const historyResponse = await fetch(historyUrl);
    const historyData = await historyResponse.json();
    displayHistory(historyData.list, data.name);

  } catch (err) {
    console.error("Error:", err);
    showError("Unable to fetch weather data. Please try again later.");
  }
}

function showWeather(data) {
  const { name, weather, main, wind: windData, clouds: cloudsData, visibility: visibilityData } = data;
  const icon = weather[0].icon;
  const description = weather[0].description;

  // Set weather info
  cityName.textContent = name;
  temperature.textContent = `${Math.round(main.temp)}°C`;
  condition.textContent = description.charAt(0).toUpperCase() + description.slice(1);
  weatherImage.src = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  // Set detailed cards
  clouds.textContent = `${cloudsData.all}%`;
  humidity.textContent = `${main.humidity}%`;
  pressure.textContent = `${main.pressure} hPa`;
  wind.textContent = `${windData.speed} km/h`;
  feelsLike.textContent = `${Math.round(main.feels_like)}°C`;
  visibility.textContent = `${(visibilityData / 1000).toFixed(1)} km`;

  // Weather explanation
  weatherSummary.textContent = `Currently in ${name}, the weather is ${description} with a temperature of ${Math.round(main.temp)}°C. 
  Humidity is ${main.humidity}% with wind speeds of ${windData.speed} km/h.`;

  // Hide error container if visible
  errorContainer.style.display = "none";
  weatherImage.style.display = "block";
}

function showError(message) {
  // Hide weather info
  weatherImage.style.display = "none";
  cityName.textContent = "";
  temperature.textContent = "";
  condition.textContent = "";
  weatherSummary.textContent = "";

  // Show error image and text vertically centered
  errorContainer.style.display = "flex";
  errorContainer.style.flexDirection = "column";
  errorContainer.style.alignItems = "center";
  errorContainer.style.justifyContent = "center";
  errorContainer.style.textAlign = "center";
  errorText.textContent = message;

  // Set error image visible
  if (errorImage) {
    errorImage.style.display = "block";
    errorImage.style.width = "120px"; // adjust as needed
    errorImage.style.marginBottom = "10px";
  }

  // Clear details and history
  document.querySelectorAll(".detail-card h4").forEach(el => (el.textContent = "--"));
  historyList.innerHTML = `<li>No history yet</li>`;
}

function displayHistory(list, cityNameText) {
  historyList.innerHTML = "";
  const uniqueDays = {};

  list.forEach(item => {
    const date = item.dt_txt.split(" ")[0];
    if (!uniqueDays[date]) {
      uniqueDays[date] = item;
    }
  });

  Object.values(uniqueDays).slice(0, 5).forEach(item => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    const temp = Math.round(item.main.temp);
    const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
    const description = item.weather[0].description;

    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${icon}" alt="${description}" style="width:24px;vertical-align:middle;margin-right:6px;">
      <span><strong>${cityNameText}</strong> - ${date}</span>  
      <span style="margin-left:6px;"><strong>${temp}°C</strong></span>
    `;
    historyList.appendChild(li);
  });
}
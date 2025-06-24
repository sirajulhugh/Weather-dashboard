const apiKey = "6a9b4228c7119b8126a3b987af108bbb"; 
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
const cityInput = document.getElementById("cityInput");
const current = document.getElementById("current");
const forecast = document.getElementById("forecast");
const historyList = document.getElementById("historyList");

let searchHistory = JSON.parse(localStorage.getItem("weatherHistory")) || [];

function saveHistory(city) {
  searchHistory = [city, ...searchHistory.filter(c => c !== city)].slice(0, 5);
  localStorage.setItem("weatherHistory", JSON.stringify(searchHistory));
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = "";
  searchHistory.forEach(city => {
    const li = document.createElement("li");
    li.textContent = city;
    li.addEventListener("click", () => fetchWeather(city));
    historyList.appendChild(li);
  });
}

function fetchWeather(city) {
  if (!city) return alert("Please enter a valid city.");

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) throw new Error(data.message);
      renderCurrent(data);
      fetchForecast(data.coord.lat, data.coord.lon);
      saveHistory(city);
    })
    .catch(err => {
      alert("City not found. Please try again.");
    });
}

function fetchForecast(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
      const daily = {};
      data.list.forEach(entry => {
        const date = entry.dt_txt.split(" ")[0];
        if (!daily[date]) daily[date] = entry;
      });

      const cards = Object.entries(daily).slice(1, 6).map(([date, info]) => `
        <div class="card">
          <strong>(${date})</strong>
          <div><img class="weather-icon" src="https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png" /></div>
          <div>Temp: ${info.main.temp.toFixed(1)}°C</div>
          <div>Wind: ${info.wind.speed} M/S</div>
          <div>Humidity: ${info.main.humidity}%</div>
        </div>
      `).join("");

      forecast.innerHTML = cards;
    });
}

function renderCurrent(data) {
  current.innerHTML = `
    <h3>${data.name} (${new Date().toISOString().split("T")[0]})</h3>
    <div style="display:flex;align-items:center;justify-content:space-between;">
      <div>
        <p>Temperature: ${data.main.temp.toFixed(1)}°C</p>
        <p>Wind: ${data.wind.speed} M/S</p>
        <p>Humidity: ${data.main.humidity}%</p>
      </div>
      <div>
        <img class="weather-icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
        <p>${data.weather[0].description}</p>
      </div>
    </div>
  `;
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  fetchWeather(city);
});

locationBtn.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => {
          renderCurrent(data);
          fetchForecast(latitude, longitude);
          saveHistory(data.name);
        });
    },
    () => alert("Location access denied.")
  );
});


renderHistory();

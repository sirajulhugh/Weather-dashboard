# Weather Dashboard

A simple, interactive weather dashboard that allows users to search for real-time weather conditions and a 5-day forecast for any city, or use their current location. Built using HTML, CSS, and JavaScript, with weather data provided by the OpenWeatherMap API.

## Features

- **Search by City:** Enter the name of a city to get current weather and a 5-day forecast.
- **Use Current Location:** Fetch weather using your device's geolocation.
- **Recent Search History:** Quickly revisit the last 5 searched cities.
- **Responsive UI:** Clean and modern layout for desktop and mobile devices.

## Demo

link : weatherdb.niat.tech

### API Key

This project uses the OpenWeatherMap API.  
The demo key is included in `script.js`, but for production use, you should [get your own API key](https://openweathermap.org/appid) and replace `apiKey` in `script.js`.

## Usage

- **Search by City:**  
  Type a city name (e.g., "New York") and click "Search".
- **Current Location:**  
  Click "Use Current Location" and allow location access.
- **History:**  
  Click a recent city from the sidebar to quickly reload its weather.

## Project Structure

```
.
├── index.html      # Main markup
├── style.css       # Styles
├── script.js       # Functionality (fetches and renders weather data)
└── .vscode/        # Editor configs (optional)
```

## Main Technologies

- HTML5, CSS3 (Flexbox)
- JavaScript (ES6)
- OpenWeatherMap API

## Customization

- Update `apiKey` in `script.js` with your own for higher API limits.
- Customize styles in `style.css` as needed.



---

> **Author:** [sirajulhugh](https://github.com/sirajulhugh)  
> Powered by [OpenWeatherMap](https://openweathermap.org/)

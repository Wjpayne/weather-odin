import displayInfo from "./modules/displayInfo.js";
import "./style.css"
import loadCurrentLocationWeather from "./modules/location.js";
const form = document.getElementById("user-form");
const cityInput = document.getElementById("city-input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;
  displayInfo(city);
  form.reset();
});

loadCurrentLocationWeather();
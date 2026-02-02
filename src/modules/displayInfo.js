import apiRequest from "./apiRequest";

const displayInfo = async (city) => {
  const data = await apiRequest(city);
  console.log("RESOLVED:", data.resolvedAddress);

  // ---------- CURRENT WEATHER ----------

  const currentIcon = document.createElement("img");
  const iconCode = data.currentConditions.icon.replace(/ /g, "_").toLowerCase();
  currentIcon.src = `https://raw.githubusercontent.com/VisualCrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${iconCode}.png`;
  currentIcon.alt = data.currentConditions.conditions;

  const iconContainer = document.getElementById("current-icon");

  // clear old icon
  iconContainer.innerHTML = "";

  iconContainer.appendChild(currentIcon);

  const locationElement = document.getElementById("location");

  let resolvedLocation = data.resolvedAddress;

  // If API returns coords, fall back to city name
  if (/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/.test(resolvedLocation)) {
    resolvedLocation = data.address || "Current Location";
  } else {
    resolvedLocation = resolvedLocation.split(",").slice(0, 2).join(", ");
  }

  locationElement.textContent = ` ${resolvedLocation}`;

  document.getElementById("date").textContent = data.days[0].datetime;

  document.getElementById("hi-low").textContent =
    `High: ${data.days[0].tempmax}°F  Low: ${data.days[0].tempmin}°F`;

  document.getElementById("temperature").textContent =
    `Current Temperature: ${data.currentConditions.temp}°F`;

  document.getElementById("conditions").textContent =
    `Conditions: ${data.currentConditions.conditions}`;

  // --------- DAILY FORECAST ----------
  const forecastContainer = document.getElementById("forecast-cards");
  forecastContainer.innerHTML = ""; // clear previous search

  data.days.slice(1, 8).forEach((day) => {
    const card = document.createElement("div");
    card.classList.add("forecast-card");

    const date = document.createElement("h3");
    date.textContent = new Date(day.datetime).toLocaleDateString("en-US", {
      weekday: "short",
    });

    const icon = document.createElement("img");
    const iconCode = day.icon.replace(/ /g, "_").toLowerCase();
    icon.src = `https://raw.githubusercontent.com/VisualCrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${iconCode}.png`;
    icon.alt = day.conditions;
    card.appendChild(icon);

    const temps = document.createElement("p");
    temps.classList.add("temp");
    temps.textContent = `${day.tempmax}° / ${day.tempmin}°`;

    const conditions = document.createElement("p");
    conditions.classList.add("conditions");
    conditions.textContent = day.conditions;

    card.append(date, temps, conditions);
    forecastContainer.appendChild(card);
  });
};

export default displayInfo;

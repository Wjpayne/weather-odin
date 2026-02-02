import displayInfo from "./displayInfo";

const loadCurrentLocationWeather = () => {
  if (!navigator.geolocation) {
    displayInfo("New York"); // fallback
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      displayInfo(`${lat},${lon}`);
    },
    () => {
      // user denied or error
      displayInfo("New York");
    }
  );
};

export default loadCurrentLocationWeather;
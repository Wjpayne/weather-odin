const apiRequest = async (location) => {
  const apiKey = "5NTMTJWBAFWASNAZSL9AT5W7W";
  const unit = "us";

  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&key=${apiKey}`
  );

  if (!response.ok) {
    alert("Weather request failed or invalid location. Please try again.");
    throw new Error("Weather request failed");
  }

  const data = await response.json();
  return data;
};

export default apiRequest;
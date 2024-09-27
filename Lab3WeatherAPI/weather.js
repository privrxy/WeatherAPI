const provinceSelect = document.querySelector("#province");
const citySelect = document.querySelector("#city");
const getWeatherButton = document.querySelector(".get-weather-btn");
const weatherDetails = document.querySelector(".current-weather .details");
const closeButton = document.querySelector("#close-button");

const API_KEY = "27eecffeea8415a6f618bbf15d4a93cb";

const cities = {
  Leyte: [
    "Albuera",
    "Bato",
    "Bibicatan",
    "Bobon",
    "Carigara",
    "Dagami",
    "Digos",
    "Hinabangan",
    "Hinunangan",
    "Inopacan",
    "Ivisan",
    "Jaro",
    "Kananga",
    "La Paz",
    "Leyte",
    "MacArthur",
    "Mahaplag",
    "Matag-ob",
    "Matalom",
    "Mayorga",
    "Merida",
    "Ormoc City",
    "Palo",
    "Palompon",
    "Pastrana",
    "San Francisco",
    "San Juan",
    "San Ricardo",
    "Silae",
    "Tacloban City",
    "Tabango",
    "Tabing",
    "Taytay",
    "Tubigagmanoc",
    "Tubigon",
    "Tulay",
    "Tunga",
    "Villaba",
  ],
  "Southern Leyte": ["Maasin", "Sogod"],
  Biliran: [
    "Almeria",
    "Cabucgayan",
    "Caibiran",
    "Culaba",
    "Kawayan",
    "Maripipi",
    "Naval",
  ],
  Samar: ["Catbalogan", "Calbayog", "Matuguinao", "Paranas"],
  "Eastern Samar": ["Borongan", "Guiuan", "Salcedo", "Jipapad"],
  "Northern Samar": ["Catubig", "Laoang", "Palapag", "Allen"],
};

function updateCitySelect() {
  const selectedProvince = provinceSelect.value;
  citySelect.innerHTML = '<option value="">Select City/Barangay</option>';
  if (selectedProvince) {
    cities[selectedProvince].forEach((city) => {
      const option = document.createElement("option");
      option.value = city;
      option.text = city;
      citySelect.appendChild(option);
    });
    citySelect.disabled = false;
  } else {
    citySelect.disabled = true;
  }
}

function fetchWeatherData(city, province) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${province},PH&units=metric&appid=${API_KEY}`;
  return fetch(weatherUrl).then((response) => response.json());
}

function getWeather() {
  const selectedProvince = provinceSelect.value;
  const selectedCity = citySelect.value;

  if (!selectedProvince || !selectedCity) {
    alert("Please select both a province and a city.");
    return;
  }

  fetchWeatherData(selectedCity, selectedProvince)
    .then((weatherData) => {
      weatherDetails.innerHTML = `
                <h2>${selectedCity} (${selectedProvince})</h2>
                <h6>Temperature: ${weatherData.main.temp}°C</h6>
                <h6>Wind: ${weatherData.wind.speed} M/S</h6>
                <h6>Humidity: ${weatherData.main.humidity}%</h6>
                <h6>Weather Condition: ${weatherData.weather[0].description}</h6>
            `;
      closeButton.style.display = "block";
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      weatherDetails.innerHTML = "<p>Error fetching weather data.</p>";
    });
}

function closeWeatherDetails() {
  weatherDetails.innerHTML = `
        <h2>_______ ( ______ )</h2>
        <h6>Temperature: __°C</h6>
        <h6>Wind: __ M/S</h6>
        <h6>Humidity: __%</h6>
        <h6>Weather Condition: __</h6>
    `;
  closeButton.style.display = "none";
  provinceSelect.selectedIndex = 0;
  citySelect.selectedIndex = 0;
  citySelect.disabled = true;
}

closeButton.addEventListener("click", closeWeatherDetails);
getWeatherButton.addEventListener("click", getWeather);
provinceSelect.addEventListener("change", updateCitySelect);
updateCitySelect();

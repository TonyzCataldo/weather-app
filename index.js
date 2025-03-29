const weatherForm = document.querySelector(".weather-form");
const input = document.querySelector(".weather-form__input");
const errorMsg = document.querySelector(".weather-form__error");
const weatherContainer = document.querySelector(".weather-display");
const displayCity = document.querySelector(".weather-display__city");
const displayTemp = document.querySelector(".weather-display__temp");
const displayHumidity = document.querySelector(".weather-display__content--humidity");
const displayDescription = document.querySelector(".weather-display__content--description");
const displayEmoji = document.querySelector(".weather-display__content--emoji");


function capitalizeWords(text) {
    return text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }


  input.addEventListener('input', function () {
    this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
  });

weatherForm.addEventListener('submit', async function (e) {
e.preventDefault();

const city = input.value;
const apiKey = "16d8dc6967379b758899b3aa4b07e0a5";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;


 
  try {
    const response = await fetch(url);
    const data = await response.json();
    const description = data.weather[0].description;
    const mainInfo = data.weather[0].main;

    if(response.ok) {
        errorMsg.classList.remove("weather-form__error--display")
        weatherContainer.classList.add("weather-display--display");
        displayCity.innerHTML = data.name
        displayTemp.innerHTML = parseInt(data.main.temp) + "°"
        displayHumidity.innerHTML = "Umidade: " + data.main.humidity + "%"
        displayDescription.innerHTML = capitalizeWords(description)
        switch (mainInfo) {
            case "Thunderstorm":
              displayEmoji.innerHTML = "⛈️"; // tempestade com raios
              break;
          
            case "Drizzle":
              displayEmoji.innerHTML = "🌦️"; // chuvisco
              break;
          
            case "Rain":
              displayEmoji.innerHTML = "🌧️"; // chuva
              break;
          
            case "Snow":
              displayEmoji.innerHTML = "❄️"; // neve
              break;
          
            case "Mist":
              displayEmoji.innerHTML = "🌫️"; // névoa leve
              break;
          
            case "Smoke":
              displayEmoji.innerHTML = "💨"; // fumaça
              break;
          
            case "Haze":
              displayEmoji.innerHTML = "🌁"; // névoa seca
              break;
          
            case "Dust":
              displayEmoji.innerHTML = "🌬️"; // poeira
              break;
          
            case "Fog":
              displayEmoji.innerHTML = "🌫️"; // nevoeiro
              break;
          
            case "Sand":
              displayEmoji.innerHTML = "🏜️"; // tempestade de areia
              break;
          
            case "Ash":
              displayEmoji.innerHTML = "🌋"; // cinzas vulcânicas
              break;
          
            case "Squall":
              displayEmoji.innerHTML = "🌬️"; // rajadas de vento
              break;
          
            case "Tornado":
              displayEmoji.innerHTML = "🌪️"; // tornado
              break;
          
            case "Clear":
              displayEmoji.innerHTML = "☀️"; // céu limpo
              break;
          
            case "Clouds":
              displayEmoji.innerHTML = "☁️"; // nublado
              break;
          
            default:
              displayEmoji.innerHTML = "🌡️"; // clima indefinido
              break;
          }
        console.log(data.weather[0])
        
    }
    else{
      errorMsg.classList.add("weather-form__error--display");
      weatherContainer.classList.remove("weather-display--display");
        displayCity.innerHTML = ""
        displayTemp.innerHTML = ""
        displayHumidity.innerHTML = ""
        displayDescription.innerHTML = ""

    }
}
catch (error) {
    errorMsg.classList.add("weather-form__error--display");
    weatherContainer.classList.remove("weather-display--display");
        displayCity.innerHTML = ""
        displayTemp.innerHTML = ""
        displayHumidity.innerHTML = ""
        displayDescription.innerHTML = ""
        console.log(error);

}
input.value = ""

}) 
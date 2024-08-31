const apiKey = "f93e4514084ecb7813a6e70e60a6ee23";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city = "London") {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}&units=metric`);

    if (response.status === 404) {
        // Show a pop-up message for an invalid city name
        alert("City not found. Please enter a valid city name.");
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        const weatherCondition = data.weather[0].main;

        // Update weather icon and background image based on weather condition
        switch (weatherCondition) {
            case "Clouds":
                weatherIcon.src = "img/.png/clouds.png";
                setBackground("cloudy");
                break;
            case "Clear":
                weatherIcon.src = "img/.png/clear.png";
                setBackground("clear-sky");
                break;
            case "Rain":
                weatherIcon.src = "img/.png/rain.png";
                setBackground("rainy");
                break;
            case "Drizzle":
                weatherIcon.src = "img/.png/drizzle.png";
                setBackground("drizzle");
                break;
            case "Mist":
                weatherIcon.src = "img/.png/mist.png";
                setBackground("mist");
                break;
            case "Snow":
                weatherIcon.src = "img/.png/snow.png";
                setBackground("snowy");
                break;
            case "Thunderstorm":
                weatherIcon.src = "img/.png/thunderstorm.png";
                setBackground("thunderstorm");
                break;
            case "Fog":
                weatherIcon.src = "img/.png/fog.png";
                setBackground("fog");
                break;
            case "Haze":
                weatherIcon.src = "img/.png/haze.png";
                setBackground("haze");
                break;
            default:
                weatherIcon.src = "img/.png/default.png";
                setBackground("default");
                break;
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Function to change the background image based on weather condition
function setBackground(weatherCondition) {
    let backgroundImage = "";

    switch (weatherCondition) {
        case "clear-sky":
            backgroundImage = "url('img/clear-sky.jpeg')";
            break;
        case "cloudy":
            backgroundImage = "url('img/cloudy.jpeg')";
            break;
        case "rainy":
            backgroundImage = "url('img/rainy.jpeg')";
            break;
        case "drizzle":
            backgroundImage = "url('img/drizzle.jpeg')";
            break;
        case "mist":
        case "fog":
            backgroundImage = "url('img/mist.jpg')";
            break;
        case "snowy":
            backgroundImage = "url('img/snowy.jpg')";
            break;
        case "thunderstorm":
            backgroundImage = "url('img/thunderstorm.jpg')";
            break;
        case "haze":
            backgroundImage = "url('img/haze.jpg')";
            break;
        default:
            backgroundImage = "url('img/default.jpg')";
            break;
    }

    document.body.style.backgroundImage = backgroundImage;
}

// Add event listener for the search button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Trigger search on pressing the Enter key
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

// Check weather for the default city on page load
checkWeather();

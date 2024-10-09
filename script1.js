// the city and current data display locations
var dateDisplay = document.getElementById("curr-date");
var dayDisplay = document.getElementById("curr-day");
var futureDays = document.querySelectorAll(".future-days");
var locationDisplay = document.getElementById("location");
// the elements with class degree will be use to traverse to the locations of temperature and weather icon
var degreesArr = document.querySelectorAll(".degree");
var weatherConditions = document.querySelectorAll(".weather-cond");
//to add weather description
var degreeDescription = document.querySelectorAll(".desc");
var searchInput = document.getElementById("search");

var baseURL = "https://api.weatherapi.com/v1/forecast.json?key=55934bedc99b4fd6b65224834240310&q="

searchInput.addEventListener("keyup", function () {
    var searchTerm = searchInput.value.toLowerCase();
    getWeather(searchTerm);
});

function updateWeather(weather) {
    locationDisplay.textContent = `${weather.location.name}`;
    //adding temperature and weather icon through traversal from each degreesArr element
    for (var i = 0; i < degreesArr.length; i++) {
        degreesArr[i].querySelector("span").textContent = `${weather.forecast.forecastday[i].day.maxtemp_c}`;
        degreesArr[i].querySelector("img").src = `https:${weather.forecast.forecastday[i].day.condition.icon}`;
    }
    console.log(weatherConditions[0].lastChild);
    weatherConditions[0].lastChild.replaceWith(`${weather.current.humidity}%`);
    weatherConditions[1].lastChild.replaceWith(`${weather.current.wind_kph}km/h`);
    weatherConditions[2].lastChild.replaceWith(`${weather.current.wind_dir}`);

    //adding minimum temperature by replacing last child in .num.text-white.fs-5
    for (var i = 1; i < degreesArr.length; i++) {
        var minTempElements = document.createElement("div");
        minTempElements.style.color = "var(--gray-text-color)"
        minTempElements.innerHTML = `<span>${weather.forecast.forecastday[i].day.mintemp_c}</span><sup>o</sup>C`;
        degreesArr[i].querySelector("div div").lastChild.replaceWith(minTempElements);
    }
    //adding weather description using the array of all .desc elements
    for (var i = 0; i < degreeDescription.length; i++) {
        degreeDescription[i].textContent = `${weather.forecast.forecastday[i].day.condition.text}`
    }

}
async function getWeather(searchTerm) {
    try {
        // fetch data from weather API using the search term
        var response = await fetch(baseURL + searchTerm + "&days=3&aqi=no&alerts=no");
        var weather = await response.json();
        updateWeather(weather);
    } catch (error) {

    }
}
function getWeatherDirection(index, direction) {
    weather.forecast.forecastday[index].day
}
function setDate() {
    var today = new Date();
    var day = today.getDay();
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    dayDisplay.textContent = weekday[day];
    futureDays[0].textContent = weekday[(day + 1) % 7];
    futureDays[1].textContent = weekday[(day + 2) % 7];
    var date = today.getDate() + " " + monthsOfYear[today.getMonth()];
    dateDisplay.textContent = date;
}

setDate();
getWeather("cairo");






//55934bedc99b4fd6b65224834240310
//weather.location.name                 weather.forecast.forecastday[1].day.maxtemp_c          weather.forecast.forecastday[2].day.maxtemp_c
//weather.current.temp_c                weather.forecast.forecastday[1].day.condition.text     weather.forecast.forecastday[2].day.mintemp_c
//weather.current.condition.text        weather.forecast.forecastday[1].day.condition.icon     weather.forecast.forecastday[2].day.condition.text
//weather.current.condition.icon        weather.forecast.forecastday[1].day.mintemp_c          weather.forecast.forecastday[2].day.condition.icon


/* degreesArr[0].querySelector("span").textContent = `${weather.current.temp_c}`
   degreesArr[1].querySelector("span").textContent = `${weather.forecast.forecastday[1].day.maxtemp_c}`
   degreesArr[2].querySelector("span").textContent = `${weather.forecast.forecastday[2].day.maxtemp_c}`
   degreesArr[0].querySelector("img").src = `https:${weather.current.condition.icon}`
   degreesArr[1].querySelector("img").src = `https:${weather.forecast.forecastday[1].day.condition.icon}`
   degreesArr[2].querySelector("img").src = `https:${weather.forecast.forecastday[2].day.condition.icon}` */
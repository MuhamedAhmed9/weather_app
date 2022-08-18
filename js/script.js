let countrySpan = document.querySelector(".weather-box .country");
let daySpans = document.querySelectorAll(".weather-box .day");
let dateSpans = document.querySelectorAll(".weather-box .date");
let weatherImgs = document.querySelectorAll(".weather-box img");
let temprature = document.querySelectorAll(".weather-box .temprature");
let weatherCondition = document.querySelectorAll(".weather-box .condition");
let countryInput = document.getElementById("countryInput");
let countryBtn = document.getElementById("searchCountry");

//fetching data from api
async function getWeatherIN3Days(country) {
  //using fetch
  let response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=ae0c4f5226c044be95f112700221006&q=${
      country || "egypt"
    }&days=3&aqi=no&alerts=no`
  ); //it return promise then i will use await
  if (response.ok) {
    let result = await response.json();
    displayData(result);
  }
}

document.addEventListener("onload", getWeatherIN3Days());

//displaying data
function displayData(data) {
  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weather = data.forecast.forecastday;

  countrySpan.innerHTML = data.location.name;
  currentDayIndex = 0;
  for (let i = 0; i < daySpans.length; i++) {
    daySpans[i].innerHTML = days[new Date().getDay() + currentDayIndex];
    temprature[i].innerHTML = `${weather[i].day.avgtemp_c} °C`;
    dateSpans[i].innerHTML = weather[i].date;
    weatherImgs[i].src = weather[i].day.condition.icon;
    weatherCondition[i].innerHTML = weather[i].day.condition.text;
    currentDayIndex++;
  }
}

//searching for country
countryBtn.addEventListener("click", function (e) {
  e.preventDefault();
  getWeatherIN3Days(countryInput.value);
});

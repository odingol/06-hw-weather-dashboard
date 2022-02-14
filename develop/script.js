var APIKey = "b34597290eeb30280f78fe35565b7c58";
var cityName = "Seattle"; //After the code completes get rid of this VARIABLE as it is already being called in the seach button





function weatherData() {
  //function weatherData should have "cityName" inside to later be changed using the search button listener (which is var cityInput)//
  var requestURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${APIKey}`;

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      console.log(data);
      displayForecast(data.coord.lat, data.coord.lon);
      let weatherTitle = $(".title");
      let icon = data.weather[0].icon;
      let weatherIcon = $(
        `<img src="http://openweathermap.org/img/w/${icon}.png"/>`
      );
      let dateToday = new Date(data.dt * 1000).toLocaleDateString("en-US");
      $(".title").text(`${data.name} (${dateToday}) `);
      $(".temp").text(`Temp: ${data.main.temp} ℉`);
      $(".wind").text(`Wind: ${data.wind.speed} MPH`);
      $(".humidity").text(`Humidity: ${data.main.humidity} %`);
      $(".uv-index").text(`UV Index:`);

      weatherTitle.append(weatherIcon);
    });
}

weatherData();




function displayForecast(lat, lon) {
  var geoLocate = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;
  fetch(geoLocate)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      console.log(data);

      for (var i = 1; i < 6; i++) {
        let forecastDate = $(`.date${i}`);
        let forecastTemp = $(`.temp-text${i}`);
        let forecastWind = $(`.wind-text${i}`);
        let forecastHumidity = $(`.humidity-text${i}`);

        let dates = new Date(data.daily[i].dt * 1000).toLocaleDateString(
          "en-US"
        );
        let weatherIcon = data.daily[i].weather[0].icon;
        let forecastIcon = $(
          `<img src=http://openweathermap.org/img/w/${weatherIcon}.png class=card-img-top icon${i}>`
        );

        forecastDate.text(dates);
        forecastTemp.text(`Temp: ${data.daily[i].temp.day} ℉`);
        forecastWind.text(`Wind: ${data.daily[i].wind_speed} MPH`);
        forecastHumidity.text(`Humidity: ${data.daily[i].humidity} %`);
    
        forecastDate.append(forecastIcon);
      }
    });
}







// function retrieveHistory(cityName) {
//     var

// }

// $('.search-btn').on('click', () => {
// var cityInput = $('.inputValue').value.trim()

// weatherData(cityInput);
// retrieveHistory(cityInput);
// return cityInput

// }

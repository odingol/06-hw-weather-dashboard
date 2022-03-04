var APIKey = "b34597290eeb30280f78fe35565b7c58";
// var cityName = "Seattle"; //After the code completes get rid of this VARIABLE as it is already being called in the seach button

var main = $('.display-results').hide();
var uvIndex = $('.uv-index');




function weatherResults(data) {
    $(".temp").text(`Temp: ${data.current.temp} ℉`);
    $(".wind").text(`Wind: ${data.current.wind_speed} MPH`);
    $(".humidity").text(`Humidity: ${data.current.humidity} %`);
    uvIndex.text(`UV Index: ${data.current.uvi}`);
    
    classifyUV(data);
};

// Color code for UV Index
function classifyUV(data) {
    uvIndex.removeClass("low-risk");
    uvIndex.removeClass("moderate-risk");
    uvIndex.removeClass("high-risk");
    if(data.current.uvi <= 2) {
        uvIndex.addClass("low-risk")
    } else if(data.current.uvi <= 5) {
        uvIndex.addClass("moderate-risk")
    } else if(data.current.uvi > 5) {
        uvIndex.addClass("high-risk");
    }
};



function weatherData(cityName) {
  //function weatherData should have "cityName" inside to later be changed using the search button listener (which is var cityInput)//
  var requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${APIKey}`;

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      console.log(data);
      displayForecast(data.coord.lat, data.coord.lon);
      let icon = data.weather[0].icon;
      let weatherIcon = $(`<img src="https://openweathermap.org/img/w/${icon}.png"/>`);
      let dateToday = new Date(data.dt * 1000).toLocaleDateString("en-US");
      $(".title").text(`${cityName} (${dateToday}) `);
      $('.title').append(weatherIcon);
    
    // local storage of the new city
    let pastCity = JSON.parse(localStorage.getItem("pastCity")) || [];
    

    if (!pastCity.includes(data.name)) {
        pastCity.push(data.name)
        localStorage.setItem("pastCity", JSON.stringify(pastCity));
        saveHistory(data.name);
    }

    });
}


// 5-Day Forecast

function displayForecast(lat, lon) {
    var geoLocate = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;
    fetch(geoLocate)
    .then(function (response) {
        return response.json();
    })
    
    .then(function (data) {
        console.log(data);
        weatherResults(data);
        
        
      for (var i = 1; i < 6; i++) {
        let forecastDate = $(`.date${i}`);
        let forecastTemp = $(`.temp-text${i}`);
        let forecastWind = $(`.wind-text${i}`);
        let forecastHumidity = $(`.humidity-text${i}`);

        let dates = new Date(data.daily[i].dt * 1000).toLocaleDateString("en-US");
        let weatherIcon = data.daily[i].weather[0].icon;
        let forecastIcon = $(`<img src=https://openweathermap.org/img/w/${weatherIcon}.png class=card-img-top icon${i}>`);

        forecastDate.text(dates);
        forecastTemp.text(`Temp: ${data.daily[i].temp.day} ℉`);
        forecastWind.text(`Wind: ${data.daily[i].wind_speed} MPH`);
        forecastHumidity.text(`Humidity: ${data.daily[i].humidity} %`);

    
        forecastDate.append(forecastIcon);
      }
    });
}



function saveHistory(cityName) {
    let recentCity = $(`<button type="button" class="btn btn-light btn-block">${cityName}</button>`);
    recentCity.on("click", function() {
        
        weatherData(cityName); 
    });

    $('.search-history').append(recentCity);
  
    
};


function retrieveHistory() {
    let historyInput = JSON.parse(localStorage.getItem("pastCity")) || [];
    for(var i = 0; i < historyInput.length; i++) {
        saveHistory(historyInput[i]);
    }
};

retrieveHistory();




$('#search-btn').on('click', function(event) {

event.preventDefault();
var cityInput = $('#search-city').val().trim();

weatherData(cityInput)

main = $('.display-results').show();

})







var APIKey = "b34597290eeb30280f78fe35565b7c58";
var cityName = 'Seattle'; //After the code completes get rid of this VARIABLE as it is already being called in the seach button



function weatherData() { //function weatherData should have "cityName" inside to later be changed using the search button listener (which is var cityInput)//
    var requestURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${APIKey}`;

    fetch(requestURL)
    .then(function(response) {
        return response.json();
    })
    
    .then(function(data) {
        console.log(data);
        let icon = data.weather[0].icon;
        // $('weather-icon').classList('src=http://openweathermap.org/img/w/' + icon + '.png');
        let dateToday = new Date(data.dt * 1000).toLocaleDateString("en-US")
        $('.title').text(`${data.name} (${dateToday}) `);
        $('.temp').text(`Temp: ${data.main.temp}℉`);
        $('.wind').text(`Wind: ${data.wind.speed} MPH`);
        $('.humidity').text(`Humidity: ${data.main.humidity} %`);
        $('.uv-index').text(`UV Index:`)
        

    })

}

weatherData();



// function retrieveHistory(lat, lon) {
//     var 





// }



// $('.search-btn').on('click', () => {
// var cityInput = $('.inputValue').value.trim()

// weatherData(cityInput);
// retrieveHistory(cityInput);
// return cityInput

// }

     






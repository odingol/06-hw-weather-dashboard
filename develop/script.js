var APIKey = "b34597290eeb30280f78fe35565b7c58";
var cityName = 'Seattle'
var requestURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`;



function weatherData() {

fetch(requestURL)
    .then(function(response) {
        return response.json();
    })

    .then(function(data) {
        console.log(data);
    })



    





}



$('.search-btn').on('click', weatherData())



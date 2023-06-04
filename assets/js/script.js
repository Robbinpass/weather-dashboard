var currentWeather = document.getElementById('forecast-current');
var currentCity = document.getElementById('search-name');
var searchButton = document.getElementById('weather-search-button');
var previousSearch = document.getElementById('current-search');
var forecastWeather = document.getElementById('forecast-current');

var searchInputVal = '';
var searchInputArray = [];
var previousStored = '';


displayPreviousSearch();


function getLocation(event) {
    inputAtttriute = event.target.getattribute('user-value');
    var requestURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + inputAtttriute + '&APPID=3499423db588f95e559c805825019d12';

    fetch(requestURL)
        .then(function(response) {
            return response.json();

    })
    .then(function(data) {
        if(data.length <= 0){
            console.log('No Weather Found')
        
        } else {
            latitude = data[0].lat;
            longitude = data[0].lon;

            getWeather(inputAtttriute);
            getForecast();
            storePreviousSearch(inputAtttriute);
            displayPreviousSearch();2
        }
    })

    clearInput();
    removeNodes();
};

// Function to  add previous search history to local storage.
function storePreviousSearch(searchInputVal) {
    searchInputArray.push(searchInputVal);
    for (i=0; i < searchInputArray.length; i++) {
        localStorage.setItem(JSON.stringify(searchInputArray[i]), i)
    }
};


// Function to populate previous search container with a list of stored locations.
function displayPreviousSearch() {
    var storedSearchArray = {...localStorage};
    var storedSearchValues = Object.keys(storedSearchArray);
    storedSearchValues.sort();
    previousSearch.innerHTML = '';

    for (let i = 0; i <storedSearchValues.length; i++)
        previousStored = storedSearchValues[i].replace('');

    
    var previousButton = document.createElement('button');
    previousButton.setAttribute('user-value', previousStored);
    previousButton.className = 'previous-button btn btn-sm btn-block';
    previousButton.addEventListener('click', getLocation);

    previousButton.appendChild(document.createTextNode(previousStored));
    previousSearch.append(previousButton);
}

// function to clear current weather and forecast from page.
function removeNodes() {
    currentWeather.innerHTML = '';
    forecastWeather.innerHTML = '';
    
}
// Function to clear current city input value.
function clearInput() {
    currentCity.value = '';

}

function getWeather(inputAtttriute) {
    var requestURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + longitude + '&units=imperialAPPID=3499423db588f95e559c805825019d12';

    fetch(requestURL)
        .then(function(response) {
            return response.JSON();
        })
        .then(function(data) {
            var weatherTemp = document.createElement('li');
            var weatherWind = document.createElement('li');
            var weatherHumidity = document.createElement('li');

            weatherTemp.innerHTML = 'Temp: ' +Math.round(data.main.temp) + 'F';
            weatherWind.innerHTML = 'Wind: ' + Math.round(data.wind.speed) + 'mph';
            weatherHumidity.innerHTML = 'Humidity: ' + data.main.humidity + '%';

            currentWeather.appendChild(weatherTemp);
            currentWeather.appendChild(weatherWind);
            currentWeather.appendChild(weatherHumidity);

            var currentDay = day.js().format('M/D/YYYY');

        })
};

function getEveryNth(data, nth) {
    var result = [];
    for (var i = 7; i < data.length; i += nth) {
        result.push(data[i]);
    
    }

    return result;
};


function getForecast() {
    var requestURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + 'longitude' + '&units=imperial&APPID=3499423db588f95e559c805825019d12';

    fetch(requestURL)
        .then(function(response) {
            return response.json;
        })
        .then(function(data) {
            var data = data.list;

            data = getEveryNth(data, 8);
        })
}




/* 
Pseudocode

1. Create an input field on our html, maybe nest that in a form tag
2. Create a button, and then add an event listener to that button, such that when the 'click' from the user is heard,
it will run its callback function. The callback function can be a custom function which you create (i.e. fetchGeoCoordinates)
or it can be an anonymous function (arrow function or regular keyword function syntax) and then inside this callback function you 
will fetch for the geo coordinates of the city. You need to have captured in a variable the input value from the user, in order to properly fetch geo
coordinates.
3. After you fetch(geocodeUrl).then(response => response.json()).then(actualData => do something with actualData like console.log it first)

fetch(geocodeUrl)
    .then( response => {
        if(response.ok == true) {
            response.json()
        } else {
            //do something else
        }
    }, rejection => {
        console.log('Rejected, rejection);
    })
    .then( data => {
        // this data object will have properties of latitude and longitude
        console.log(data);
        // run another fetch to One Call API endpoint, we need our latitude and longitude for this fetch
        // where are they? 
    })

4. Save the data you want from your geocode fetch into variables you can use in your fetch to One Call API. When you have your variables

*/
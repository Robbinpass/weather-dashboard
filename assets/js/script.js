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
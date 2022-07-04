const searchForm = document.getElementById("search-form");
const inputSearch = document.getElementById("input-search");
const currentDayCity = document.getElementById("current-day-city");
const apiKey = '3cf3d0f46762d6f660218062d57ea829';
const currentDayTemp = document.getElementById("current-day-temp");
const currentDayWind = document.getElementById("current-day-wind");
const currentDayHumidity = document.getElementById("current-day-humidity");
const currentDayUv = document.getElementById("current-day-uv");
const divForecast = document.getElementById("forecast-row");
const weatherEl = document.getElementById('weather');
const userInput = inputSearch.value;

function getOneCallApi(lon, lat){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then(function(response){
        return response.json()
    })
    .then(function(onecallData){
        console.log(onecallData)
    })

}


function getWeatherData(city){

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(function(response){
        return response.json();
        
        
    })
    .then(function(currentWeather){
        // console.log(currentWeather);
        
        // console.log(currentWeather);
        return getOneCallApi(currentWeather.coord.lon, currentWeather.coord.lat)
    })
    
    
    
}

//when i click search button
searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    //get user input
    // const userInput = inputSearch.value;
    // console.log(userInput);

    //send req to weather api

    // fetch weather data base on city name
    getWeatherData(inputSearch.value)
        .then(function(weatherData){
            
            
            console.log(weatherData);

            //once we have the data, 
            //generate data into the dom
    
    
            // GOOGLE - how do i convert icon code into image
    
            // current
            const dateTime = moment(weatherData.current.dt, 'X').format("YYYY-MM-DD");
            // console.log(dateTime);

            currentDayCity.innerHTML = `${userInput} ${dateTime} icon`
            currentDayTemp.textContent = weatherData.current.temp;
            //current temp is in kelvin, google to convert to celcius

            
            
            //store city name in localstorage
            // render history in the search list

            showForecast();

        })
        return weatherData;
    
})


// function showForecast(lon, lat){
//     return fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${apiKey}`)
//         .then(function(response){
//         return response.json()})

//         divForecast.appendChild(h2)




// $(structure.append(weatherEl));

function showForecast(days){
    getWeatherData(userInput);

    const row = $("<div>");
    let rowClass = 'row forecast-row';
    row.attr('class', rowClass);
    
    const divCol = $("<div>");
    divCol.attr('class', 'col-2');

    const divCard = $("<div>");
    divCard.attr('class', 'card');

    const divCardBody = $("<div>");
    divCardBody.attr('class', 'card-body');

    const divCardTitle = $("<h6>");
    divCardTitle.attr('class', 'card-title');

    const divCardText = $("<div>");
    divCardText.attr('class', 'card-text');

    const pSpanTemp = $("<p>");
    pSpanTemp.attr('id', 'current-day-temp');

    const pSpanWind = $("<p>");
    pSpanWind.attr('id', 'current-day-wind');

    const pSpanHumidity = $("<p>");
    pSpanHumidity.attr('id', 'current-day-humidity');
    pSpanHumidity.textContent = 'hello';
    console.log(days);


    row.append().appendChild();
    // row.append(divCol, divCard, divCardBody, divCardTitle, divCardText, pSpanTemp, pSpanWind, pSpanHumidity);
    return row;
    

    // const textarea = $('<textarea id="text-box" rows="3">')
    // textareaCol.append(textarea);

    // const existingEvent = localStorage.getItem(hour);
    // textarea.val(existingEvent, hour);


    // const buttonCol = $("<div>");
    // buttonCol.attr('class', 'button-div button-col col-2');

    // const saveButton = $('<button id="saveBtn" class="btn btn-primary save-button">');
    // saveButton.text('Save');

    // buttonCol.append(saveButton);

    

    //then i can add text to each timeblock 
    
    // then i click save button, 
    //saves to page and enters event into local storage

}
// showForecast();
// console.log('hello');



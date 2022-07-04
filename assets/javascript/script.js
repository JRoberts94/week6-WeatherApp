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
const divBody = document.getElementById('card-body');
const iconImage = document.getElementById('icon-image');


function getOneCallApi(lon, lat){
    return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then(function(response){
        
        return response.json()
    })
    

}


function getWeatherData(city){

    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(function(response){
        return response.json();
    })
    .then(function(currentWeather){
        console.log(currentWeather);
        // console.log(currentWeather);

        return getOneCallApi(currentWeather.coord.lon, currentWeather.coord.lat, currentWeather.dt)
    })
    
}

//when i click search button
searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    //get user input
    const userInput = inputSearch.value;
    // const userInput = inputSearch.value;
    // console.log(userInput);

    //send req to weather api

    // fetch weather data base on city name
    // getWeatherData(inputSearch.value)
    getWeatherData(userInput)
        .then(function(weatherData){
            // return weatherData;
            
            
            console.log(weatherData);

            //once we have the data, 
            //generate data into the dom
    
    
            // GOOGLE - how do i convert icon code into image
    
            // current
            const dateTime = moment(weatherData.current.dt, 'X').format("YYYY-MM-DD");
            // console.log(dateTime);
            // console.log(dateTime);
            // var currentWeatherUV = weatherData.current.uvi;
            // console.log(currentWeatherUV);
            var currentCityWeatherIcon = weatherData.current.weather[0].icon;
            // console.log(currentCityWeatherIcon);
            // var currentWeatherIconEl = $('<img>');
            $("#icon-image").attr("src", "http://openweathermap.org/img/wn/" + currentCityWeatherIcon + ".png");
            // divBody.append(currentWeatherIconEl);

            // const icon = weatherData
            currentDayCity.innerHTML = `${userInput} ${dateTime}`;
            currentDayTemp.textContent = weatherData.current.temp;
            currentDayWind.textContent = weatherData.current.wind_speed;
            currentDayHumidity.textContent = weatherData.current.humidity;
            currentDayUv.textContent = weatherData.current.uvi;
            //current temp is in kelvin, google to convert to celcius
            
            
            
            //store city name in localstorage
            // render history in the search list
            
            weatherData.daily.slice(0, 5).forEach((weather) => {
                console.log(weatherData);
                const peanuts = createForecastcolumn(weather.dt, weather.weather[0].icon, weather.temp.day, weather.wind_speed, weather.humidity);
                console.log(weather);
                
                // console.log(list.weather.icon);
                divForecast.append(peanuts[0]);  
            })
            
            
            
        })
        // return getWeatherData();
        
    });
    
    
    // function showForecast(lon, lat){
        //     fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        //         .then(function(response){
            //             console.log(response);
            //         return response.json()})
            
            //         // divForecast.appendChild(h2)
            
            // };
            
            
            // $(structure.append(weatherEl));
            
function createForecastcolumn(date, icon, temp, wind, humidity){
    // getWeatherData(userInput);
    const divCol = $("<div>");
    divCol.attr('class', 'col-2');
     
                
    const divCard = $("<div>");
    divCard.attr('class', 'card');
    // divCard.text("ABCDE");
    divCol.append(divCard);
    
    const divCardBody = $("<div>");
    divCardBody.attr('class', 'card-body');
    divCard.append(divCardBody);
    
    const fcDateTime = moment(date, 'X').format("YYYY-MM-DD");
    console.log(fcDateTime);

    const divCardTitle = $("<h6>");
    divCardTitle.attr('class', 'card-title');
    divCardTitle.text(fcDateTime);
    console.log(divCardTitle);
    divCardBody.append(divCardTitle);
    // get weather icon and display by appending to city name element            
    var forecastWeatherIconEl = $('<img>');
    forecastWeatherIconEl.attr("src", "http://openweathermap.org/img/wn/" + icon + ".png");
    divCardBody.append(forecastWeatherIconEl);
    
    
    const divCardText = $("<div>");
    divCardText.attr('class', 'card-text');
    divCardBody.append(divCardText);
    
    const pSpanTemp = $("<p>");
    pSpanTemp.attr('id', 'current-day-temp');
    pSpanTemp.text("Temp: " + " " + temp);
    divCardText.append(pSpanTemp);
    
    const pSpanWind = $("<p>");
    pSpanWind.attr('id', 'current-day-wind');
    pSpanWind.text("Wind: " + " " + wind);
    divCardText.append(pSpanWind);
    
    const pSpanHumidity = $("<p>");
    pSpanHumidity.attr('id', 'current-day-humidity');
    pSpanHumidity.text("Humidity: " + " " + humidity);
    // pSpanHumidity.textContent = 'hello';
    divCardText.append(pSpanHumidity);
    // console.log();
    
    
    // row.append().appendChild();
    
    return divCol;
    

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




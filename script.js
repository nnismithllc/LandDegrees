//Global Variables
let apiKey = "4269100fc528413bd680bdd1eb05bd5d"
let city = []
let currentConditions = "https://api.openweathermap.org/data/2.5/weather?appid="
let fiveDay =
"https://api.openweathermap.org/data/2.5/forecast?4269100fc528413bd680bdd1eb05bd5d={cityname}={countrycode}"
let uvIndex =
"https://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}"
let searchedArr = JSON.parse(localStorage.getItem("searchedItems")) || [];


//Taking in User Input, and Passing the Value into a Variable
$(document).ready(function() {
  $("#search-input").on("click", function(event) {
    var userInput = $("#city-search").val()
    console.log(userInput)
    getWeather(userInput)
    $("#three").removeClass("hide")
    $("#four").removeClass("hide")
  
  })
})

// function myFunction() {

//   // Set the Value of Each Text Area to Empty String
//   $(".forms").val("");

//   // For Each Textarea
//   for(let i = 1; i <= 10; i++){

//   // Set the Local Storage Item to Empty String
//     localStorage.setItem("item-" + i, "");

//   }


// UserInput is Passed into the getWeather Function as Arguement 'CityName'
function getWeather(cityName) {
  let apiCall = ""

// Enter apiCall
  if (cityName !== "") {
    apiCall = currentConditions + apiKey + "&q=" + cityName
//return apiCall;

  } else {
    apiCall = currentConditions + apiKey + "&q=" + city
//return Second apiCall;
  }
 
// Retrieve Data from OpenWeather Site and Filters a Loop for Responses
  $.ajax({
    url: apiCall,
    method: "GET"
  }).then(function(response) {
    console.log(response)
    let feelslike = response.main.temp
    feelslike = (feelslike - 273.15) * 1.8 + 32
    feelslike = Math.floor(feelslike)
    let city = response.name
    let humidity = response.main.humidity
    console.log (humidity)
    let wind = response.wind.speed
    console.log (wind)
   
// Gets Results and Appends It to Page
    let weatherIcon = `https://openweathermap.org/img/w/${response.weather[0].icon}.png`
    $("#current-weather").append("<div>" + city + "</div>") 
    $("#current-weather").append("<div>" + feelslike + "</div>")
    $("#current-weather").append("<div>" + wind + "</div>")
    $("#current-weather").append("<div>" + humidity + "</div>")
    $("#weatherIcon").attr("src",weatherIcon)
    
// Retrieve Data from OpenWeather Site and Filters a Loop for 5 Day Information
    fiveDay = `https://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=${apiKey}`
     $.ajax({
      url: fiveDay,
      method: "GET"
    }).then(function(response) {
      console.log(response)

      var averageTemp = 0
      var previousdate = ""
      var count = 0
      var results = 0
      previousdate = moment().format("MM/DD/YY")
      for (let index = 0; index < response.list.length; index++) {
        var currentDate = moment(response.list[index].dt, "X").format("MM/DD/YY")

        var temp = response.list[index].main.temp;
        var humidity = response.list[index].main.humidity;
        var wind = response.list[index].wind.speed;

let weatherIcons="<img src= 'https://openweathermap.org/img/w/"+response.list[index].weather[0].icon+".png'>";

        console.log(humidity)
        temp = (temp - 273.15) * 1.8 + 32
        temp = Math.floor(temp)
        console.log(currentDate)
        console.log(temp)

        if (previousdate === currentDate) {
          averageTemp = averageTemp + temp
          count++
          previousdate = currentDate

        } else {
 // Retrieving Data from Apicall and Producing Information Results
        results = averageTemp / count
        results = Math.floor(results)
        console.log("results:", results)
        console.log(length)

// Append Data to the Divs on HTML
        var card = $("<div class = 'card col-sm-2'>");
      
        var div1 = $("<div class= 'card-header'>");
        div1.append("Date" + '' + currentDate + weatherIcons)
        card.append(div1)

        var div2 = $("<div class= 'card-body'>");
        div2.append("Temperature: " + temp)
        card.append(div2)

        var div3 =  $("<div class= 'card-body'>");
        div3.append("wind: " + wind)
        card.append(div3)

        var div4 =  $("<div class= 'card-body'>");
        div4.append("humidity: " + humidity)
        card.append(div4)

// Grabs 5 Day Data and Append to Page
        $("#five-day").append(card)
        count = 0
        averageTemp = 0
        previousdate = currentDate
         
        }
      }
    })
  })
}

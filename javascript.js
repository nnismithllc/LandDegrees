//global variables
let apiKey = "4269100fc528413bd680bdd1eb05bd5d"
let city = []
let currentConditions = "https://api.openweathermap.org/data/2.5/weather?appid="
let fiveDay =
  "https://api.openweathermap.org/data/2.5/forecast?4269100fc528413bd680bdd1eb05bd5d={cityname}={countrycode}"
let uvIndex =
  "https://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}"
let searchedArr = JSON.parse(localStorage.getItem("searchedItems")) || [];

// let iconcode = a.weather[0].icon;
// let iconurl = "http://openweathermap.org/img/w/" + iconcode + "10d.png";
// $('#wicon').attr('src', iconurl);





//taking in user input, and passing the value into a variable
$(document).ready(function() {
  $("#search-input").on("click", function(event) {
    var userInput = $("#city-search").val()
    console.log(userInput)
    getWeather(userInput)
  
  })
})

// userInput is passed into the getWeather function as arguement 'cityName'
function getWeather(cityName) {
  let apiCall = ""

  if (cityName !== "") {
    apiCall = currentConditions + apiKey + "&q=" + cityName
    //return apiCall;
  } else {
    apiCall = currentConditions + apiKey + "&q=" + city
    //return apiCall;
  }
 

  $.ajax({
    url: apiCall,
    method: "GET"
  }).then(function(response) {
    console.log(response)
    let feelslike = response.main.temp
    feelslike = (feelslike - 273.15) * 1.8 + 32
    feelslike = Math.floor(feelslike)
    city = response.name
    let humity = response.main.humity
    let wind = response.wind.speed
    console.log (wind)
    // let weatherIcon = response.weather[0].icon;
    // console.log(weatherIcon)
    // var weatherIconlink = $("<img>")
    let weatherIcon = `https://openweathermap.org/img/w/+repsonse.weather[0].icon+.png`
    
    $("#current-weather").append("<div>" + feelslike + "</div>")
    $("#current-weather").append("<div>" + city + "</div>")
    $("#current-weather").append("<div>" + wind + "</div>")
    fiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
    

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
        var currentDate = moment(response.list[index].dt, "X").format(
          "MM/DD/YY"
        )
        var temp = response.list[index].main.temp
        temp = (temp - 273.15) * 1.8 + 32
        temp = Math.floor(temp)
        console.log(currentDate)
        console.log(temp)

        if (previousdate === currentDate) {
          averageTemp = averageTemp + temp
          count++
          previousdate = currentDate
        } else {
          results = averageTemp / count
          results = Math.floor(results)
          console.log("results:", results)
          var card = $("<div class = 'card col-sm-3'>")

          var div1 = $("<div class= 'card-header'>")
          div1.append("Date" + '' + currentDate)
          card.append(div1)

          var div2 = $("<div class= 'card-body'>")
          div2.append("Average Temperature: " + results)
          card.append(div2)

          var div3 =  $("<div class= 'card-body'>")
          div3.append("wind: " + results)
          card.append(div3)

          $("#five-day").append(card)

          count = 0
          averageTemp = 0
          previousdate = currentDate
         
        }
      }
    })
  })
}


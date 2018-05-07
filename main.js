var currentWeather = [];
var forecastWeather = [];

//ONLY finds the specifics for the current weather. ie today
var renderCurrentWeather = function() {
  $('.current-weather').empty();

      var source = $('#current-weather-template').html();
      var template = Handlebars.compile(source);
      var newHTML = template({
        temperature: Math.round(currentWeather[0].main.temp * 1.8 - 459.67) + '\xB0',
        city: currentWeather[0].name + ', ' + currentWeather[0].sys.country,
        low: Math.round(currentWeather[0].main.temp_min * 1.8 - 459.67) + '\xB0',
        high: Math.round(currentWeather[0].main.temp_max * 1.8 - 459.67) + '\xB0',
        condition: currentWeather[0].weather[0].description,
        icon: 'http:\/\/openweathermap.org\/img\/w\/' + currentWeather[0].weather[0].icon + '.png',
      })
      $(newHTML).appendTo($('.current-weather'));
};

//ONLY finds the specifics for the 5 day forecast
var renderForecast = function() {
  $('.forecast').empty();
  // var iconsss = weather[0].weather[0].icon;
  // var iconIt = 'http:\/\/openweathermap.org\/img\/w\/' + icon +'.png';
  for (var i = 0; i < forecastWeather[0].list.length; i++) {
//these are the days that I want. They are all noon time.
    if (forecastWeather[0].list[i] === forecastWeather[0].list[4] ||
      forecastWeather[0].list[i] === forecastWeather[0].list[12] ||
      forecastWeather[0].list[i] === forecastWeather[0].list[20] ||
      forecastWeather[0].list[i] === forecastWeather[0].list[28] ||
      forecastWeather[0].list[i] === forecastWeather[0].list[36]) {

      var source = $('#forecast-template').html();
      var template = Handlebars.compile(source);
      var newHTML = template({
        temperature: Math.round(forecastWeather[0].list[i].main.temp * 1.8 - 459.67) + '\xB0',
        low: Math.round(forecastWeather[0].list[i].main.temp_min * 1.8 - 459.67) + '\xB0',
        high: Math.round(forecastWeather[0].list[i].main.temp_max * 1.8 - 459.67) + '\xB0',
        condition: forecastWeather[0].list[i].weather[0].description,
        icon: 'http:\/\/openweathermap.org\/img\/w\/' + forecastWeather[0].list[i].weather[0].icon + '.png',
        time: forecastWeather[0].list[i].dt_txt
      })
      $(newHTML).appendTo($('.forecast'));

    }
  }
};
//adding to the currentWeather then rendering
var addCurrentWeather = function(data) {

  currentWeather = [];
  currentWeather.push(data);
  renderCurrentWeather();

};
//adding to the forecastWeather then rendering
var addForecast = function(data) {

  forecastWeather = [];
  forecastWeather.push(data);
  renderForecast();

};


//search the api for the current weather
var fetchCurrentWeather = function(query) {
  $.ajax({
    method: "GET",
    url: "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&APPID=c3e4742d4285be4db83f16fdce0c8f7b",
    dataType: "json",
    success: function(data) {
      addCurrentWeather(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
};
//search the api for the 5 day forecast
var fetchForecast = function(query) {
  $.ajax({
    method: "GET",
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + query + "&APPID=c3e4742d4285be4db83f16fdce0c8f7b",
    dataType: "json",
    success: function(data) {
      addForecast(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
};


//function for when you click on the search button. it gets the values of search parameter.
$('.search').on('click', function() {
  var search = $('#search-query').val();

  fetchCurrentWeather(search);
  fetchForecast(search);
});

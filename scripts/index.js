
$(document).ready(() => {
  var fahrenheit, celsius;
  var currentUrl = "https://api.openweathermap.org/data/2.5/weather";
  var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";
  var apiKeyC = '5784cd5acade608a751f7a6777f5b158';
  var apiKeyF = 'c1c8298c3ffde842d6161c2da1ceb5b0'
  getLatLon();

  function getLatLon() {
    if (navigator.geolocation){ 
      navigator.geolocation.getCurrentPosition(function(position) { 
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        currentUrl += "?lat="+lat+"&lon="+lon+"&APPID="+apiKeyC+"&units=metric";
        forecastUrl += "?lat="+lat+"&lon="+lon+"&APPID="+apiKeyF+"&units=metric";
        getCurrentData();
        //getForecastData();
      });
    } else if (!navigator.geolocation) {
      $.ajax({
        url: "https://geoip-db.com/json/",
        type: 'GET',
        dataType: 'json',
        success: function(data) {
          let lat = data.latitude;
          let lon = data.longitude;
          currentUrl += "?lat="+lat+"&lon="+lon+"&APPID="+apiKeyC+"&units=metric";
          forecastUrl += "?lat="+lat+"&lon="+lon+"&APPID="+apiKeyF+"&units=metric";
          getCurrentData();
          //getForecastData();
        },
        error: function(error) {
          
          alert('Oops something went wrong, Please try again.');
          console.log(error);
        }
      });
    } else {
      console.log("Browser doesn't support geolocation!");
      alert("Oops looks like your browser doesn't support geolocation" );
    };
  }


  function getCurrentData() {
    $.ajax({
      url: currentUrl,
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        let temperature = data.main.temp;
        var celsius = Math.round(temperature);
        var fahrenheit = Math.round(celsius * 1.8 + 32);
        var desc = data.weather[0].main;
        var code = [data.weather[0].id];
        var unitC = " &#8451;";
        var unitF = " &#8457;";
        //var code = 301;
        $('#city').html(data.name);

        $('#desc').html(data.weather[0].main);
        $('#temp').html(fahrenheit);
        $('.temp-unit').attr('id', 'f').html(unitF);
        $('.icon').html("<i class='wi wi-owm-" + data.weather[0].id + "'></i>");

        $('#toggle-button').on('click', () => {
            if ($('.temp-unit').attr('id') == 'c') {
              $('#temp').html(fahrenheit);
              $('.temp-unit').attr('id', 'f').html(unitF);
            } else if ($('.temp-unit').attr('id')=='f') {
              $('#temp').html(celsius);
              $('.temp-unit').attr('id', 'c').html(unitC);
            }
        });


        function setPhoto () {
          var date = new Date();
          var currentTime = date.getHours();
          var sunrise = new Date(data.sys.sunrise * 1000);
          var sunset = new Date(data.sys.sunset * 1000);
          var day = (date.getHours() > sunrise.getHours() && date.getHours() < sunset.getHours());
          var night = (date.getHours() > sunset.getHours());
          var sunsetTime = (date.getHours() == sunset.getHours());
          var sunriseTime = (date.getHours() == sunrise.getHours());
         
        if (sunsetTime || sunriseTime) {
            // sunset theme
            if (code >= 200 && code < 240) {
              // thunderstorm theme
              $('.weather-container').css({
                'background-image': 'url("../img/storm.jpg")',
                'color': 'white'
              });
            } else if (code >= 300 && code <= 531) {
              // rain theme
              $('.weather-container').css({
                'background-image': 'url("../img/rain.jpg")'
              });
              $('#city').css({
                'font-weight': '300'
              });
              $('#desc').css({
                'font-weight': '400'
              });
            } else if (code >= 600 && code <=622) {
               // snow theme
              $('.weather-container').css({
                'background-image': 'url("../img/snow.jpg")'
              });
            } else if ((code >= 801 && code <= 804) || (code >= 700 && code <= 741)) {
              // cloudy theme
              $('.weather-container').css({
                'background-image': 'url("../img/cloudy.jpg")'
              });
            } else {
              // clear
              $('.weather-container').css({
                'background-image': 'url("../img/sunset.jpg")',
                'color': 'white'
              });
            }
          } else if (night) {
            // night theme
            if (code >= 200 && code < 240) {
              // thunderstorm theme
              $('.weather-container').css({
                'background-image': 'url("../img/storm.jpg")',
                'color': 'white'
              });
            } else if (code >= 300 && code <= 531) {
              // rain theme
              $('.weather-container').css({
                'background-image': 'url("../img/night-rain.jpg")',
                'color': 'white'
              });
            } else if (code >= 600 && code <=622) {
               // snow theme
              $('.weather-container').css({
                'background-image': 'url("../img/snow.jpg")'
              });
            } else if ((code >= 801 && code <= 804) || (code >= 700 && code <= 741)) {
              // cloudy theme
              $('.weather-container').css({
                'background-image': 'url("../img/night-cloudy.jpg")',
                'color': 'white'
              });
            } else {
              // night clear
              $('.weather-container').css({
                'background-image': 'url("../img/night.jpg")',
                'color': 'white'
              });
            }
          } else {
            if (code >= 200 && code < 240) {
              // thunderstorm theme
              $('.weather-container').css({
                'background-image': 'url("../img/storm.jpg")',
                'color': 'white'
              });
            } else if (code >= 300 && code <= 531) {
              // rain theme
              $('.weather-container').css({
                'background-image': 'url("../img/rain.jpg")'
              });
              $('#city').css({
                'font-weight': '300'
              });
              $('#desc').css({
                'font-weight': '400'
              });
            } else if (code >= 600 && code <=622) {
               // snow theme
              $('.weather-container').css({
                'background-image': 'url("../img/snow.jpg")'
              });
            } else if ((code >= 801 && code <= 804) || (code >= 700 && code <= 741)) {
              // cloudy theme
              $('.weather-container').css({
                'background-image': 'url("../img/cloudy.jpg")'
              });
            } else {
              $('.weather-container').css({
                'background-image': 'url("../img/day.jpg")'
              });
            }
          };
        };
        setPhoto();
      },
      error: function(err) {
        alert('Oops something went wrong, Please try again.');
        console.log(err);
      }
    });
  }


  /*function getForecastData() {
    $.ajax({
      url: forecastUrl,
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        function getTemp() {
          for (i = 0; i < 5; i++) {
            var fcTemp = data.list[i].main.temp;
          }
        }
        //var fcTemp = data.list.main.temp;
        var fcC = Math.round(fcTemp);
        var fcF = Math.round(fcC * 1.8 + 32);
        
        $('#fc-temp-1').html(fcF + " &#8457;");
        $('#fc-temp-2').html(fcF + " &#8457;");
      },
      error: function(err) {
        alert('Oops something went wrong, Please try again.');
        console.log(err);
      }
    });
  }*/


});
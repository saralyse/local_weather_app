
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
        forecastUrl += "?lat="+lat+"&lon="+lon+"&APPID="+apiKeyF+"&units=imperial";
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
          forecastUrl += "?lat="+lat+"&lon="+lon+"&APPID="+apiKeyF+"&units=imperial";
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

       
        $('#city').html(data.name);

        $('#desc').html(data.weather[0].main);
        $('#temp').html(Math.round(data.main.temp));
        $('.temp-unit').attr('id', 'c').html(unitC);
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

        function getTime () {
          var date = new Date();
          var time = date.getHours();
          
          if (time > 19 || time < 6) {
            // night theme
            $('.weather-container').css({
              'background-image': 'url("../img/night.jpg")'
            });
          } else if (time > 16 && time < 19) {
            // sunset theme
            $('.weather-container').css({
              'background-image': 'url("../img/sunset.jpg")'
            });
          } else if (time > 0 && code == /^[2]/) {
            // thunderstorm theme
            $('.weather-container').css({
              'background-image': 'url("../img/storm.jpg")'
            });
          } else if (time > 0 && (code == /^[3]/ || code == /^[5]/)) {
            // rain theme
            $('.weather-container').css({
              'background-image': 'url("../img/rain.jpg")'
            });
          } else if (time > 0 && code == /^[6]/) {
            $('.weather-container').css({
              'background-image': 'url("../img/snow.jpg")'
            });
          } else if (time > 0 && (code == /^[8]/ && code != 800)) {
            $('.weather-container').css({
              'background-image': 'url("../img/cloudy.jpg")'
            });
          } else {
            $('.weather-container').css({
              'background-image': 'url("../img/day.jpg")'
            });
          };
        };
        getTime();
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
        
        $('#fc-temp').html(data.list.main.temp + " &#8457;");
      },
      error: function(err) {
        alert('Oops something went wrong, Please try again.');
        console.log(err);
      }
    });
  }*/


  




});
import * as config from '../config.js';

$(document).ready(() => {
  var fahrenheit, celsius;
  var weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
  var apiKey = config.OWM_API_KEY;
  getLatLon();

  function getLatLon() {
    $.ajax({
      url: "https://geoip-db.com/json/",
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        var lat = data.latitude;
        var lon = data.longitude;
        $('#city').html(data.city + ", ");
        $('#state').html(data.state);
        $('#zip').html(data.postal);
        weatherUrl += "?lat="+lat+"&lon="+lon+"&APPID="+apiKey+"&units=metric";
        getWeatherData();
      },
      error: function(error) {
        alert('Oops something went wrong, Please try again.');
        console.log(error);
      }
    });
  }

  function getWeatherData() {
    $.ajax({
      url: weatherUrl,
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        var temperature = data.main.temp;
        var celsius = Math.round(temperature);
        var fahrenheit = Math.round(celsius * 1.8 + 32);
        var desc = data.weather[0].main + ": " + data.weather[0].description;

        $('#desc').html(desc);
        $('#temp').html(data.main.temp + " &#8451;");
        $('.temp-unit').attr('id', 'c');
        $('.icon').html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>");


        /*var date = new Date();
        var sunrise = new Date(data.sys.sunrise * 1000);
        var sunset = new Date(data.sys.sunset * 1000);

        if (date.getHours() >= sunrise.getHours() && date.getHours() < sunset.getHours()) {
          var iconID = 'wi wi-owm-day-${result.data.weather[0].id}';
        } else if (date.getHours() >= sunset.getHours()) {
          var iconID = 'wi wi-owm-night-${result.data.weather[0].id}';
        }

        $('.icon').html("<i class=" + iconID + "></i>");
        */


        $('#toggle-button').on('click', () => {
            if ($('.temp-unit').attr('id') == 'c') {
              $('#temp').html(fahrenheit + " &#8457;")
              $('.temp-unit').attr('id', 'f');
            } else if ($('.temp-unit').attr('id')=='f') {
              $('#temp').html(celsius + " &#8451;");
              $('.temp-unit').attr('id', 'c');
            }
        });
      },
      error: function(err) {
        alert('Oops something went wrong, Please try again.');
        console.log(err);
      }
    });
  }
  

  $('#submit-button').on('click', () => {
    let zip = $('#change-loc').html();
    $('#submit-button').attr("href", "https://api.openweathermap.org/data/2.5/weather?zip="+zip+",us"+"&APPID="+apiKey+"&units=metric");
  })



});



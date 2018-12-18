$(document).ready(() => {
  var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";
  //var apiKeyC = '5784cd5acade608a751f7a6777f5b158';
  var apiKeyF = 'c1c8298c3ffde842d6161c2da1ceb5b0';
  getLatLon();

  function getLatLon() {
    if (navigator.geolocation){ 
      navigator.geolocation.getCurrentPosition(function(position) { 
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        forecastUrl += "?lat="+lat+"&lon="+lon+"&APPID="+apiKeyF+"&cnt=4&units=metric";

        getForecastData();
      });
    } else if (!navigator.geolocation) {
      $.ajax({
        url: "https://geoip-db.com/json/",
        type: 'GET',
        dataType: 'json',
        success: function(data) {
          let lat = data.latitude;
          let lon = data.longitude;
          //currentUrl += "?lat="+lat+"&lon="+lon+"&APPID="+apiKeyC+"&units=metric";
          forecastUrl += "?lat="+lat+"&lon="+lon+"&APPID="+apiKeyF+"&cnt=4&units=metric";

          getForecastData();
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
  

  function getForecastData() {
    $.ajax({
      url: forecastUrl,
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        var unitC = '<span class="unit"> &#8451;</span>';
        var unitF = '<span class="unit"> &#8457;</span>';


        $('#city').html(data.city.name);
        $('.current-desc').html(data.list[0].weather[0].main);

        for (i = 0; i < data.list.length; i++) {
          let temp = (data.list[i].main.temp);
          let celsius = Math.round(temp);
          let fahrenheit = Math.round(celsius * 1.8 + 32);

          $('#temp' + i).html(fahrenheit + unitF);
         

          /*
          $('.toggle .btn').on("click", () => {
            if ($('.toggle').attr('id') =='c') {
              $('#temp' + i).html(fahrenheit + unitF);
              $('.toggle').attr('id','f');
            } else if ($('.toggle').attr('id') == 'f') {
              $('#temp' + i).html(celsius + unitC)
              $('.toggle').attr('id','c');
            }
          });
          */
              
          var icon = data.list[i].weather[0].id;
          $('#icon' + i).html("<i class='wi wi-owm-" + icon + "'></i>");

          var desc = data.list[i].weather[0].main;
          $('#desc' + i).html(desc);

          //translate wind direction
          
          function windDirection(dir) {
            var dirArr = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
            var points = Math.floor(dir / 45);
            return dirArr[points];
          }

          var windDir = windDirection(data.list[0].wind.deg);


          // Extra info for more toggle
          $('#min-temp').html("Low Temp: " + Math.round(data.list[0].main.temp_min)+unitF);
          $('#max-temp').html("High Temp: " + Math.round(data.list[0].main.temp_max)+ unitF);
          $('#humidity').html("Humidity: " + Math.round(data.list[0].main.humidity) + "%");
          $('#clouds').html("Cloud Cover: " + Math.round(data.list[0].clouds.all) + "%");
          $('#wind').html("Wind Speed: " + data.list[0].wind.speed + " mph");
          $('#wind-dir').html("Wind Direction: " + windDir);


          $('#current-details').hide();
          $('#arrow-up').hide();

          $('#arrow-down').on("click", () => {
            $('#current-details').slideDown("slow");
            $('#arrow-down').hide("slow");
            $('#arrow-up').show("slow");
          })

          $('#arrow-up').on("click", () => {
            $('#current-details').slideUp("slow");
            $('#arrow-up').hide("slow");
            $('#arrow-down').show("slow");
          })


          // Add days of week to 3 day forecast
          var dayName = moment().add(i, "day").format("ddd");
          $('#day' + i).html(dayName);
        };


        // Add background class based on current weather
        var date = new Date();
        var time = date.getHours();
        var code = data.list[0].weather[0].id;

        if (time > 16 && time < 19) {
          // sunset theme
          if (code >= 200 && code < 240) {
            // thunderstorm theme
            $('.weather-container').addClass("storm");
          } else if (code >= 300 && code <= 531) {
            // rain theme
            $('.weather-container').addClass("rain");
          } else if (code >= 600 && code <=622) {
             // snow theme
            $('.weather-container').addClass("snow");
          } else if ((code >= 801 && code <= 804) || (code >= 700 && code <= 741)) {
            // cloudy theme
            $('.weather-container').addClass("cloudy");
          } else {
            // clear
            $('.weather-container').addClass("sunset");
          }
        } else if (time > 19 || time < 6) {
          // night theme
          if (code >= 200 && code < 240) {
            // thunderstorm theme
            $('.weather-container').addClass("storm");
          } else if (code >= 300 && code <= 531) {
            // rain theme
            $('.weather-container').addClass("night-rain");
          } else if (code >= 600 && code <=622) {
             // snow theme
            $('.weather-container').addClass("snow");
          } else if ((code >= 801 && code <= 804) || (code >= 700 && code <= 741)) {
            // cloudy theme
           $('.weather-container').addClass("night-cloudy");
          } else {
            // night clear
            $('.weather-container').addClass("night");
          }
        } else {
          if (code >= 200 && code < 240) {
            // thunderstorm theme
            $('.weather-container').addClass("storm");
          } else if (code >= 300 && code <= 531) {
            // rain theme
            $('.weather-container').addClass("rain");
          } else if (code >= 600 && code <=622) {
             // snow theme
            $('.weather-container').addClass("snow");
          } else if ((code >= 801 && code <= 804) || (code >= 700 && code <= 741)) {
            // cloudy theme
            $('.weather-container').addClass("cloudy");
          } else {
            $('.weather-container').addClass("day");
          }
        };
      },
      error: function(err) {
        alert('Oops something went wrong, Please try again.');
         console.log(err);
      }
    });
  }


});
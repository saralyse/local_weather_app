$(document).ready(() => {
  var fahrenheit, celsius;
  var currentUrl = "https://api.openweathermap.org/data/2.5/weather";
  var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";
  var sunUrl = "https://api.sunrise-sunset.org/json";
  var apiKeyC = '5784cd5acade608a751f7a6777f5b158';
  var apiKeyF = 'c1c8298c3ffde842d6161c2da1ceb5b0';
  getLatLon();

  function getLatLon() {
    if (navigator.geolocation){ 
      navigator.geolocation.getCurrentPosition(function(position) { 
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        currentUrl += "?lat="+lat+"&lon="+lon+"&APPID="+apiKeyC+"&units=metric";
        forecastUrl += "?lat="+lat+"&lon="+lon+"&APPID="+apiKeyF+"&cnt=4&units=imperial";
        sunUrl += "?lat="+lat+"&lng="+lon+"&date=today";
        
        //getCurrentData();
        getForecastData();
        getSunTimes();
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
          forecastUrl += "?lat="+lat+"&lon="+lon+"&APPID="+apiKeyF+"&cnt=4&units=imperial";
          sunUrl += "?lat="+lat+"&lng="+lon+"&date=today";
          //getCurrentData();
          getForecastData();
          getSunTimes();
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


  function getSunTimes() {
    $.ajax({
      url: sunUrl,
      type: 'GET',
      dataType: 'json',
      sucess: function(data) {
        var date = new Date();
        var time = date.getTime();
        var sunsetStart = data.results.sunset;
        var sunsetStop = data.results.nautical_twilight_end;
        var sunriseStart = data.results.nautical_twilight_start;
        var sunriseStop = data.results.sunrise;

        if (time >= sunsetStart && time <= sunsetStop) {
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
        } else if (time > sunsetStop && time < sunriseStart) {
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

      }
    })

  }

  /*function getCurrentData() {
    $.ajax({
      url: currentUrl,
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        
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
        }
        setPhoto();
        },
      error: function(err) {
        alert('Oops something went wrong, Please try again.');
        console.log(err);
      }
    });
  }
  */
  
  

  function getForecastData() {
    $.ajax({
      url: forecastUrl,
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        var temp;
        var fahrenheit = Math.round(temp);
        var celsius = Math.round((fahrenheit -32) / 1.8);
        var unitC = '<span class="unit"> &#8451;</span>';
        var unitF = '<span class="unit"> &#8457;</span>';

        $('#city').html(data.city.name);

        for (i = 0; i < data.list.length; i++) {
          let temp = (data.list[i].main.temp);
          let fahrenheit = Math.round(temp);
          let celsius = Math.round((fahrenheit - 32) / 1.8);

          $('#f' + i).html(fahrenheit + unitF);
          $('#c' + i).html(celsius + unitC);

          $('.toggle-c').hide();

          $('#toggle-button').on('click', () => {
            $('.toggle-f, .toggle-c').toggle();
          });
              
    
          var icon = data.list[i].weather[0].id;
          $('#icon' + i).html("<i class='wi wi-owm-" + icon + "'></i>");
              
          var desc = data.list[i].weather[0].main;
          $('#desc' + i).html(desc);

          var dayName = moment().add(i, "day").format("ddd");
          $('#day' + i).html(dayName);
        }

      },
      error: function(err) {
        alert('Oops something went wrong, Please try again.');
         console.log(err);
      }
    });
  }


});
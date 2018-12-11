$(document).ready(() => {
  var fahrenheit, celsius;
  var weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
  var apiKey = "5784cd5acade608a751f7a6777f5b158";
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
        console.log(err);
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
        celsius = temperature;
        fahrenheit = celsius * 1.8 + 32;
        var icon = data.weather[0].icon;
        var desc = data.weather[0].main+", "+data.weather[0].description;
        $('#desc').html(desc);
        $('#icon').attr('src','http://openweathermap.org/img/w/'+icon+'.png');
        $('#temp').html(data.main.temp+" &#8451;")
      },
      error: function(err) {
        alert('Oops something went wrong, Please try again.');
        console.log(err);
      }
    });
  }
  $('#toggle').on('click', () => {
    if ($('.temp-unit').attr('id')=='c') {
      $('#temp').html(fahrenheit + " &#8457;");
      $('.temp-unit').attr('id', 'f');
    } else if ($('.temp-unit').attr('id')=='f') {
      $('#temmp').html(celsius+"&#8451;");
      $('.temp-unit').attr('id', 'c');
    }
  });

  $('#submit-button').on('click', () => {
    let zip = $('#change-loc').html();
    $('#submit-button').attr("href", "api.openweathermap.org/data/2.5/weather?zip="+zip+",us");
  })

});



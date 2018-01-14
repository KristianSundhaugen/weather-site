    var api = "https://fcc-weather-api.glitch.me/api/current?";
    var lat, lon;
    var currentTempInCelsius = 0;

    $( document ).ready(function(){

        var dt = new Date()
        var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        $('#day').html(days[dt.getDay()]);
        var months =
            ["January","February","March","April","May","June","July","August","September","October","November","December"]
        $('#date').html(months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear());
        $('#time').html((dt.getHours()>12?(dt.getHours()-12):dt.getHours()).toString() + ":" +
            ((dt.getMinutes() < 10 ? '0' : '').toString() + dt.getMinutes().toString()) + (dt.getHours()
            < 12 ? ' AM' : ' PM').toString());

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = "lat=" + position.coords.latitude;
                var lon = "lon=" + position.coords.longitude;
                getWeather(lat, lon);
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    })


    function getWeather(lat, lon) {
        var urlString = api + lat + "&" + lon;
        $.ajax({
            url: urlString, success: function (result) {
                $("#city").text(result.name);
                currentTempInCelsius = Math.round(result.main.temp * 10)/10;
                $("#temperature").text(currentTempInCelsius);
                $("#weather-status").text(result.weather[0].main);
                $(".windspeed").text(result.wind.speed + " Km/h");
                $(".humidity").text(result.main.humidity + " %");
                $(".pressure").text(result.main.pressure + " hPa");
                IconGen(result.weather[0].main);
            }
        })
    }

     function IconGen(weatherStatus) {
        var weatherStatus = weatherStatus.toLowerCase()
        switch (weatherStatus) {
            case 'drizzle':
                addIcon(weatherStatus)
                break;
            case 'clouds':
                addIcon(weatherStatus)
                break;
            case 'rain':
                addIcon(weatherStatus)
                break;
            case 'snow':
                addIcon(weatherStatus)
                break;
            case 'clear':
                addIcon(weatherStatus)
                break;
            case 'thunderstom':
                addIcon(weatherStatus)
                break;
            default:
                $('div.clouds').removeClass('hide');
        }
    }

    function addIcon(weatherStatus) {
        $('div.' + weatherStatus).removeClass('hide');
    }


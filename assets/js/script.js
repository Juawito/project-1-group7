let searchInput = $('.search-input');
let currentApi = 'https://api.openweathermap.org/data/2.5/weather?q=';
let sunriseApi = 'https://api.sunrise-sunset.org/json?'
let apiKey = '&appid=cffe501940779b25824bab372a571e3e';

function getCurrentApi(requestUrl) {
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // console.log(data.sys.sunrise);
            // console.log(data.sys.sunset);
            let lon = data.coord.lon;
            let lat = data.coord.lat;
            // let unixTimestamp = data.dt;
            // convertUnixToDate(unixTimestamp);
            // console.log(lon);
            // console.log(lat);
            // getSunriseApi(lat, lon);
        });
}
function convertUnixToDate(unixTimestamp) {
    let unixTime = unixTimestamp * 1000;
    let dateObject = new Date(unixTime);
    let dateFormat = dateObject.toLocaleString()
    console.log(dateFormat);
}
function getSunriseApi(lat, lon) {
    let latParam = 'lat=' + lat;
    let lonParam = 'lng=' + lon;
    let date = '&date=';
    let finalApiString = sunriseApi + latParam + '&' + lonParam + date + 'today' + '&formatted=0';
    fetch(finalApiString)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            let sunriseTime = data.results.sunrise;
            let sunsetTime = data.results.sunset;
            let sunTimes = {
                sunrise: sunriseTime,
                sunset: sunsetTime
            }
            // localStorage.setItem('Suntimes', JSON.stringify(sunTimes));
        })
    // .then(function(){
    //     document.location.replace('sunrise-sunset.html');
    // });
}
$('.searchbtn').on('click', function (event) {
    event.preventDefault();
    let city = $('.search-input').val();
    let finalCurrentWeather = currentApi + city + apiKey;
    getCurrentApi(finalCurrentWeather);
})

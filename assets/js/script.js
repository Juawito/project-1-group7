let searchInput = $('.search-input');
let currentApi = 'https://api.geocod.io/v1.6/geocode?';
let sunriseApi = 'https://api.sunrise-sunset.org/json?'
let apiKey = '&api_key=f4ea0e36fa26426ef641161fff3673044056a24';
// format for dates => YYYY-MM-DD
// console.log(sunriseTime);
// let dayJSExample = dayjs(sunriseTime).format("YYYY-MM-DD");
// console.log(dayJSExample);

function getCurrentApi(requestUrl) {
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            let lat = data.results[0].location.lat;
            let lon = data.results[0].location.lng;
            console.log(lon);
            console.log(lat);
            getSunriseApi(lat, lon);
        });
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
            function convertUtcToEst(time) {
                let date = new Date(time);
                return date.toString();
            }
            let sunriseTime = data.results.sunrise;
            let sunsetTime = data.results.sunset;
            let localSunriseTime = convertUtcToEst(sunriseTime);
            let localSunsetTime = convertUtcToEst(sunsetTime);
            console.log(localSunriseTime);
            console.log(localSunsetTime);
            let sunTimes = {
                sunrise: localSunriseTime,
                sunset: localSunsetTime
            }
            localStorage.setItem('Suntimes', JSON.stringify(sunTimes));
        })
    .then(function(){
        document.location.replace('sunrise-sunset.html');
    });
}
$('.searchbtn').on('click', function (event) {
    event.preventDefault();
    let zipCode = $('.search-input').val();
    zipCode = 'postal_code=' + zipCode;
    let finalApiString = currentApi + zipCode + apiKey;
    getCurrentApi(finalApiString);
})
$(document).ready(function(){
    $('.datepicker').datepicker();
  });

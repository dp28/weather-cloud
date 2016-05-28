var request = require("request-promise");
var open_weather_map_transformer_1 = require("./open-weather-map-transformer");
var API_KEY = process.env.OPEN_WEATHER_MAP_KEY;
var BASE_URL = "http://api.openweathermap.org/data/2.5/forecast?units=metric";
function fetchForecast(location) {
    return request(buildUrl(location)).promise()
        .then(JSON.parse)
        .then(open_weather_map_transformer_1.transformResponse);
}
exports.fetchForecast = fetchForecast;
function buildUrl(_a) {
    var latitude = _a.latitude, longitude = _a.longitude;
    return BASE_URL + "&lat=" + latitude + "&lon=" + longitude + "&appid=" + API_KEY;
}

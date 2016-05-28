var request = require("request-promise");
var forecast_io_transformer_1 = require("./forecast-io-transformer");
var API_KEY = process.env.FORECAST_IO_KEY;
var BASE_URL = "https://api.forecast.io/forecast";
function fetchForecast(location) {
    return request(buildUrl(location)).promise()
        .then(JSON.parse)
        .then(forecast_io_transformer_1.transformResponse);
}
exports.fetchForecast = fetchForecast;
function buildUrl(_a) {
    var latitude = _a.latitude, longitude = _a.longitude;
    return BASE_URL + "/" + API_KEY + "/" + latitude + "," + longitude;
}

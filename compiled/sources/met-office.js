var request = require("request-promise");
var R = require("ramda");
var API_KEY = process.env.MET_OFFICE_KEY;
var BASE_URL = "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json";
function getForecast(location) {
    return request(buildUrl(location)).promise()
        .then(JSON.parse)
        .then(convertResponse);
}
exports.getForecast = getForecast;
function buildUrl(location) {
    return BASE_URL + "/" + location.id + "?res=3hourly&key=" + API_KEY;
}
function convertResponse(response) {
    var days = response.SiteRep.DV.Location.Period.map(convertDay);
    return days.reduce(R.concat);
}
function convertDay(dayResponse) {
    return dayResponse.Rep.map(function (data) { return ({
        time: new Date(),
        humidityPercentage: parseInt(data.H),
        precipitationProbabilityPercentage: parseInt(data.Pp),
        wind: {
            speedMph: parseInt(data.S),
            direction: data.D
        },
        weatherType: data.W,
        temperatureC: parseInt(data.T)
    }); });
}

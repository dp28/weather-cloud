var request = require("request-promise");
var met_office_transformer_1 = require("./met-office-transformer");
var API_KEY = process.env.MET_OFFICE_KEY;
var BASE_URL = "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json";
function fetchForecast(location) {
    return request(buildUrl(location)).promise()
        .then(JSON.parse)
        .then(met_office_transformer_1.transformResponse);
}
exports.fetchForecast = fetchForecast;
function buildUrl(location) {
    return BASE_URL + "/" + location.id + "?res=3hourly&key=" + API_KEY;
}

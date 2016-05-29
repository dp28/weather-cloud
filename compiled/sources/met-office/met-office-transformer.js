var R = require("ramda");
var met_office_interface_1 = require("./met-office-interface");
var directions_1 = require("../../utils/directions");
function transformResponse(response) {
    var days = response.SiteRep.DV.Location.Period.map(convertDay);
    return days.reduce(R.concat);
}
exports.transformResponse = transformResponse;
function convertDay(dayResponse) {
    function timeAt(numMinutes) {
        var time = new Date(dayResponse.value);
        time.setMinutes(numMinutes);
        return time;
    }
    return dayResponse.Rep.map(function (data) { return ({
        time: timeAt(parseInt(data.$)),
        humidityPercentage: parseInt(data.H),
        precipitationProbabilityPercentage: parseInt(data.Pp),
        wind: {
            speedMph: parseInt(data.S),
            bearing: directions_1.compassDirectionToBearing(data.D)
        },
        weatherType: met_office_interface_1.WeatherTypes[data.W],
        temperatureC: parseInt(data.T)
    }); });
}

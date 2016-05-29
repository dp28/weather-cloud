var directions_1 = require("../../utils/directions");
function transformResponse(response) {
    return response.list.map(transformPoint);
}
exports.transformResponse = transformResponse;
function transformPoint(apiPoint) {
    return {
        time: new Date(apiPoint.dt * 1000),
        humidityPercentage: apiPoint.main.humidity,
        precipitationProbabilityPercentage: null,
        wind: {
            speedMph: metresPerSecondToMilesPerHour(apiPoint.wind.speed),
            bearing: Math.round(directions_1.meteorologicalAngleToBearing(apiPoint.wind.deg))
        },
        weatherType: apiPoint.weather[0].description,
        temperatureC: Math.round(apiPoint.main.temp)
    };
}
var MetresPerMile = 1609.34;
function metresPerSecondToMilesPerHour(metresPerSecond) {
    var metresPerHour = metresPerSecond * 60 * 60;
    return Math.round(metresPerHour / MetresPerMile);
}

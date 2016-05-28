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
            direction: toCompassDirection(apiPoint.wind.deg)
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
var CompassDirections;
(function (CompassDirections) {
    CompassDirections[CompassDirections["N"] = 0] = "N";
    CompassDirections[CompassDirections["NNE"] = 1] = "NNE";
    CompassDirections[CompassDirections["NE"] = 2] = "NE";
    CompassDirections[CompassDirections["ENE"] = 3] = "ENE";
    CompassDirections[CompassDirections["E"] = 4] = "E";
    CompassDirections[CompassDirections["ESE"] = 5] = "ESE";
    CompassDirections[CompassDirections["SE"] = 6] = "SE";
    CompassDirections[CompassDirections["SSE"] = 7] = "SSE";
    CompassDirections[CompassDirections["S"] = 8] = "S";
    CompassDirections[CompassDirections["SSW"] = 9] = "SSW";
    CompassDirections[CompassDirections["SW"] = 10] = "SW";
    CompassDirections[CompassDirections["WSW"] = 11] = "WSW";
    CompassDirections[CompassDirections["W"] = 12] = "W";
    CompassDirections[CompassDirections["WNW"] = 13] = "WNW";
    CompassDirections[CompassDirections["NW"] = 14] = "NW";
    CompassDirections[CompassDirections["NNW"] = 15] = "NNW";
})(CompassDirections || (CompassDirections = {}));
var numDirections = 16;
var degreesPerDirection = 360 / numDirections;
var halfDegreesPerDirection = degreesPerDirection / 2;
function toCompassDirection(angle) {
    var degreesWithNorthAsZero = angle + halfDegreesPerDirection;
    var directionIndex = Math.floor(degreesWithNorthAsZero / degreesPerDirection) % numDirections;
    return CompassDirections[directionIndex];
}

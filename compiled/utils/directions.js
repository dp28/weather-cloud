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
})(exports.CompassDirections || (exports.CompassDirections = {}));
var CompassDirections = exports.CompassDirections;
var numDirections = 16;
var degreesPerDirection = 360 / numDirections;
var halfDegreesPerDirection = degreesPerDirection / 2;
function meteorologicalAngleToCompassDirection(meteorologicalAngle) {
    return bearingToCompassDirection(meteorologicalAngleToBearing(meteorologicalAngle));
}
exports.meteorologicalAngleToCompassDirection = meteorologicalAngleToCompassDirection;
function meteorologicalAngleToBearing(meteorologicalAngle) {
    return meteorologicalAngle + halfDegreesPerDirection;
}
exports.meteorologicalAngleToBearing = meteorologicalAngleToBearing;
function bearingToCompassDirection(bearing) {
    var directionIndex = Math.floor(bearing / degreesPerDirection) % numDirections;
    return CompassDirections[directionIndex];
}
exports.bearingToCompassDirection = bearingToCompassDirection;
function compassDirectionToBearing(compassDirection) {
    var directionIndex = CompassDirections[compassDirection.toUpperCase()] || 0;
    return directionIndex * degreesPerDirection;
}
exports.compassDirectionToBearing = compassDirectionToBearing;

"use strict";
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
exports.toCompassDirection = toCompassDirection;

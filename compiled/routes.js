var express_1 = require("express");
var R = require("ramda");
var Promise = require("bluebird");
var Locations = require("./locations");
var index_1 = require("./sources/index");
var indexedSources = R.indexBy(R.prop("id"), index_1.Sources);
var router = express_1.Router();
router.get("/api/locations", function (request, response) {
    var term = request.query.like;
    var limit = request.query.limit;
    Locations.getLocationsLike(term, limit).then(response.send.bind(response));
});
router.get("/api/sources", function (request, response) {
    response.send(index_1.Sources);
});
router.get("/api/forecasts/:locationId", function (request, response) {
    Locations.findById(request.params.locationId)
        .then(fetchFromAllSources)
        .then(response.send.bind(response));
});
router.get("/api/forecasts/:locationId/sources/:sourceId", function (request, response) {
    var source = indexedSources[request.params.sourceId];
    Locations.findById(request.params.locationId)
        .then(source.fetchForecast)
        .then(response.send.bind(response));
});
exports.default = router;
function fetchFromAllSources(location) {
    return Promise
        .all(index_1.Sources.map(fetchForSource(location)))
        .then(function (sources) { return ({ sources: sources }); });
}
var fetchForSource = R.curry(function (location, source) {
    return source
        .fetchForecast(location)
        .then(function (forecast) { return ({ source: source, forecast: forecast }); });
});

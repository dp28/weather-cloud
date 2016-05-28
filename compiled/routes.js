var express_1 = require("express");
var R = require("ramda");
var Location = require("./locations");
var index_1 = require("./sources/index");
var indexedSources = R.indexBy(R.prop("id"), index_1.Sources);
var router = express_1.Router();
router.get("/api/locations", function (request, response) {
    var term = request.query.like;
    var limit = request.query.limit;
    Location.getLocationsLike(term, limit).then(response.send.bind(response));
});
router.get("/api/sources", function (request, response) {
    response.send(index_1.Sources);
});
router.get("/api/forecasts/:locationId/sources/:sourceId", function (request, response) {
    var source = indexedSources[request.params.sourceId];
    Location.findById(request.params.locationId)
        .then(source.fetchForecast)
        .then(response.send.bind(response));
});
exports.default = router;

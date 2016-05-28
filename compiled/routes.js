var express_1 = require("express");
var locations_1 = require("./locations");
var index_1 = require("./sources/index");
var router = express_1.Router();
router.get("/api/locations", function (request, response) {
    var term = request.query.like;
    var limit = request.query.limit;
    locations_1.getLocationsLike(term, limit).then(response.send.bind(response));
});
router.get("/api/sources", function (request, response) {
    response.send(index_1.Sources);
});
index_1.Sources.forEach(function (source) {
    router.get("/api/forecasts/:id/" + source.id, function (request, response) {
        locations_1.findById(request.params.id)
            .then(source.fetchForecast)
            .then(response.send.bind(response));
    });
});
exports.default = router;

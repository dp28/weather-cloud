var express_1 = require("express");
var locations_1 = require("./locations");
var router = express_1.Router();
router.get("/api/locations", function (request, response) {
    var term = request.query.like;
    var limit = request.query.limit;
    locations_1.getLocationsLike(term, limit).then(response.send.bind(response));
});
exports.default = router;

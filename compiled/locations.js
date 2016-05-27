var Promise = require("bluebird");
var R = require("ramda");
var stringSimilarity = require("fast-levenshtein");
var Locations = require("../lib/met-office/sites.json");
var nameLike = R.curry(function (term, _a) {
    var name = _a.name;
    return new RegExp(term, "i").test(name);
});
// Returns a promise to mock an API call, which this should be replaced with if this project starts
// to be used.
function getLocationsLike(term, limit) {
    var filterAndSort = (term && term.length) ? filterLocations(term) : R.identity;
    return R.pipe(filterAndSort, R.take(limit || -1), Promise.resolve.bind(Promise))(Locations);
}
exports.getLocationsLike = getLocationsLike;
function filterLocations(term) {
    return R.pipe(R.filter(nameLike(term)), R.sort(cachingCompareSimilarity(term)));
}
function cachingCompareSimilarity(term) {
    var similarities = {};
    function similarityFor(_a) {
        var id = _a.id, name = _a.name;
        similarities[id] = similarities[id] || stringSimilarity.get(term, name);
        return similarities[id];
    }
    return function (a, b) { return similarityFor(a) - similarityFor(b); };
}

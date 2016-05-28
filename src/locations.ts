import * as Promise from "bluebird";
import * as R from "ramda";

const stringSimilarity = require("fast-levenshtein");

const Locations = require("../lib/met-office/sites.json");

export interface Location {
  id: string;
  latitude: string;
  longitude: string;
  name: string;
}

export function findById(id: string): Promise<Location> {
  return Promise.resolve(R.find(R.propEq("id", id))(Locations));
}

const nameLike = R.curry((term: string , { name }: { name: string }) => {
  return new RegExp(term, "i").test(name);
});

// Returns a promise to mock an API call, which this should be replaced with if this project starts
// to be used.
export function getLocationsLike(term: string, limit: number): Promise<Location[]> {
  const filterAndSort = (term && term.length) ? filterLocations(term) : R.identity;
  return R.pipe(
    filterAndSort,
    R.take(limit || -1),
    Promise.resolve.bind(Promise)
  )(Locations);
}

function filterLocations(term: string): (locations: Location[]) => Location[] {
  return R.pipe(
    R.filter(nameLike(term)),
    R.sort(cachingCompareSimilarity(term))
  );
}

function cachingCompareSimilarity(term: string) {
  let similarities: { [id: string]: number } = {};

  function similarityFor({ id, name }: Location) {
    similarities[id] = similarities[id] || stringSimilarity.get(term, name);
    return similarities[id];
  }

  return (a: Location, b: Location) => similarityFor(a) - similarityFor(b);
}

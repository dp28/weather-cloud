import { Router } from "express";
import * as R from "ramda";
import * as Promise from "bluebird";

import * as Locations from "./locations";
import { Sources } from "./sources/index";
import { Source } from "./sources/source";
import { ForecastPoint } from "./sources/forecast-point";

const indexedSources = R.indexBy(R.prop("id"), Sources);

const router = Router();

router.get("/api/locations", (request, response) => {
  const term: string  = request.query.like;
  const limit: number = request.query.limit;
  Locations.getLocationsLike(term, limit).then(response.send.bind(response));
});

router.get("/api/sources", (request, response) => {
  response.send(Sources);
});

router.get("/api/forecasts/:locationId", (request, response) => {
  Locations.findById(request.params.locationId)
    .then(fetchFromAllSources)
    .then(response.send.bind(response));
});

router.get("/api/forecasts/:locationId/sources/:sourceId", (request, response) => {
  const source = indexedSources[request.params.sourceId];
  Locations.findById(request.params.locationId)
    .then(source.fetchForecast)
    .then(response.send.bind(response));
});

export default router;

interface MultiSourceResponse {
  sources: SourceResponse[];
}

interface SourceResponse {
  source: Source;
  forecast: ForecastPoint[];
}

function fetchFromAllSources(location: Locations.Location): Promise<MultiSourceResponse> {
  return Promise
    .all(Sources.map(fetchForSource(location)))
    .then(sources => ({ sources }));
}

const fetchForSource = R.curry((location: Locations.Location, source: Source): Promise<SourceResponse> => {
  return source
    .fetchForecast(location)
    .then(forecast => ({ source, forecast }));
  });

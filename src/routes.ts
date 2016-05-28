import { Router } from "express";
import * as R from "ramda";

import * as Location from "./locations";
import { Sources } from "./sources/index";

const indexedSources = R.indexBy(R.prop("id"), Sources);

const router = Router();

router.get("/api/locations", (request, response) => {
  const term: string  = request.query.like;
  const limit: number = request.query.limit;
  Location.getLocationsLike(term, limit).then(response.send.bind(response));
});

router.get("/api/sources", (request, response) => {
  response.send(Sources);
});

router.get("/api/forecasts/:locationId/sources/:sourceId", (request, response) => {
  const source = indexedSources[request.params.sourceId];
  Location.findById(request.params.locationId)
    .then(source.fetchForecast)
    .then(response.send.bind(response));
});

export default router;

import { Router } from "express";

import { getLocationsLike, findById } from "./locations";
import { Sources } from "./sources/index";

const router = Router();

router.get("/api/locations", (request, response) => {
  const term: string  = request.query.like;
  const limit: number = request.query.limit;
  getLocationsLike(term, limit).then(response.send.bind(response));
});

Sources.forEach(source => {
  router.get(`/api/forecasts/:id/${source.id}`, (request, response) => {
    findById(request.params.id)
      .then(source.fetchForecast)
      .then(response.send.bind(response));
  });
});

export default router;

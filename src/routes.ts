import { Router } from "express";

import { getLocationsLike } from "./locations";

const router = Router();

router.get("/api/locations", (request, response) => {
  const term: string  = request.query.like;
  const limit: number = request.query.limit;
  getLocationsLike(term, limit).then(response.send.bind(response));
});

export default router;

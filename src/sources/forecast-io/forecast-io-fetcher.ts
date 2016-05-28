import * as request from "request-promise";
import * as Promise from "bluebird";

import { ForecastPoint } from "../forecast-point";
import { Location } from "../../locations";
import { transformResponse } from "./forecast-io-transformer";

const API_KEY = process.env.FORECAST_IO_KEY;
const BASE_URL = "https://api.forecast.io/forecast";

export function fetchForecast(location: Location): Promise<ForecastPoint[]> {
  return request(buildUrl(location)).promise()
    .then(JSON.parse)
    .then(transformResponse);
}

function buildUrl({ latitude, longitude }: Location): string {
  return `${BASE_URL}/${API_KEY}/${latitude},${longitude}`;
}

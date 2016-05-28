import * as request from "request-promise";
import * as Promise from "bluebird";

import { ForecastPoint } from "../forecast-point";
import { Location } from "../../locations";
import { transformResponse } from "./open-weather-map-transformer";

const API_KEY = process.env.OPEN_WEATHER_MAP_KEY;
const BASE_URL = "http://api.openweathermap.org/data/2.5/forecast?units=metric";

export function fetchForecast(location: Location): Promise<ForecastPoint[]> {
  return request(buildUrl(location)).promise()
    .then(JSON.parse)
    .then(transformResponse);
}

function buildUrl({ latitude, longitude }: Location): string {
  return `${BASE_URL}&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
}

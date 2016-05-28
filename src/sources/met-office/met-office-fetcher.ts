import * as request from "request-promise";
import * as Promise from "bluebird";

import { ForecastPoint } from "../forecast-point";
import { Location } from "../../locations";
import { transformResponse } from "./met-office-transformer";

const API_KEY = process.env.MET_OFFICE_KEY;
const BASE_URL = "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json";

export function fetchForecast(location: Location): Promise<ForecastPoint[]> {
  return request(buildUrl(location)).promise()
    .then(JSON.parse)
    .then(transformResponse);
}

function buildUrl(location: Location): string {
  return `${BASE_URL}/${location.id}?res=3hourly&key=${API_KEY}`;
}

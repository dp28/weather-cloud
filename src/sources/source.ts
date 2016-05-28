import * as Promise from "bluebird";

import { ForecastPoint } from "./forecast-point";
import { Location } from "../locations";

export interface Source {
  id: string;
  name: string;
  url: string;
  fetchForecast: FetchForecast;
}

export interface FetchForecast {
  (location: Location): Promise<ForecastPoint[]>
}

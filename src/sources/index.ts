import { Source } from "./source";
import { MetOffice } from "./met-office/met-office-source";
import { OpenWeatherMap } from "./open-weather-map/open-weather-map-source";
import { ForecastIo } from "./forecast-io/forecast-io-source";

export const Sources: Source[] = [
  ForecastIo,
  MetOffice,
  OpenWeatherMap
];

import { Source } from "./source";
import { MetOffice } from "./met-office/met-office-source";
import { OpenWeatherMap } from "./open-weather-map/open-weather-map-source";

export const Sources: Source[] = [
  MetOffice,
  OpenWeatherMap
];

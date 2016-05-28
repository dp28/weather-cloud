import { Source } from "../source";
import { fetchForecast } from "./open-weather-map-fetcher";

export const OpenWeatherMap: Source = {
  id: "open-weather-map",
  name: "Open Weather Map",
  url: "http://openweathermap.org/",
  fetchForecast
};

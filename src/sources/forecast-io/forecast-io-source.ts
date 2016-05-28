import { Source } from "../source";
import { fetchForecast } from "./forecast-io-fetcher";

export const ForecastIo: Source = {
  id: "forecast-io",
  name: "Forecast.io",
  url: "http://forecast.io/",
  fetchForecast
};

import { APIResponse, APIForecastPoint } from "./forecast-io-interface";
import { ForecastPoint } from "../forecast-point";
import { bearingToCompassDirection } from "../../utils/directions";

export function transformResponse(response: APIResponse): ForecastPoint[] {
  return response.hourly.data.map(transformPoint);
}

function transformPoint(apiPoint: APIForecastPoint): ForecastPoint {
  return {
    time: new Date(apiPoint.time * 1000),
    humidityPercentage: apiPoint.humidity * 100,
    precipitationProbabilityPercentage: apiPoint.precipProbability * 100,
    wind: {
      speedMph: Math.round(apiPoint.windSpeed),
      direction: bearingToCompassDirection(apiPoint.windBearing)
    },
    weatherType: apiPoint.summary,
    temperatureC: Math.round(apiPoint.temperature)
  };
}

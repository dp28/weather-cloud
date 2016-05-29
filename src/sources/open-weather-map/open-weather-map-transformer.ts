import { APIResponse, APIForecastPoint } from "./open-weather-map-interface";
import { ForecastPoint } from "../forecast-point";
import { meteorologicalAngleToBearing } from "../../utils/directions";

export function transformResponse(response: APIResponse): ForecastPoint[] {
  return response.list.map(transformPoint);
}

function transformPoint(apiPoint: APIForecastPoint): ForecastPoint {
  return {
    time: new Date(apiPoint.dt * 1000),
    humidityPercentage: apiPoint.main.humidity,
    precipitationProbabilityPercentage: null,
    wind: {
      speedMph: metresPerSecondToMilesPerHour(apiPoint.wind.speed),
      bearing: Math.round(meteorologicalAngleToBearing(apiPoint.wind.deg))
    },
    weatherType: apiPoint.weather[0].description,
    temperatureC: Math.round(apiPoint.main.temp)
  };
}

const MetresPerMile = 1609.34;

function metresPerSecondToMilesPerHour(metresPerSecond: number): number {
  const metresPerHour = metresPerSecond * 60 * 60;
  return Math.round(metresPerHour / MetresPerMile);
}

import { APIResponse, APIForecastPoint } from "./open-weather-map-interface";
import { ForecastPoint } from "../forecast-point";

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
      direction: toCompassDirection(apiPoint.wind.deg)
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

enum CompassDirections {
  N, NNE, NE, ENE,
  E, ESE, SE, SSE,
  S, SSW, SW, WSW,
  W, WNW, NW, NNW
}

const numDirections = 16;
const degreesPerDirection = 360 / numDirections;
const halfDegreesPerDirection = degreesPerDirection / 2;

function toCompassDirection(angle: number): string {
  const degreesWithNorthAsZero = angle + halfDegreesPerDirection;
  const directionIndex = Math.floor(degreesWithNorthAsZero / degreesPerDirection) % numDirections;
  return CompassDirections[directionIndex];
}

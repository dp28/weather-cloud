export interface ForecastPoint {
  time: Date;
  humidityPercentage: number;
  precipitationProbabilityPercentage: number;
  wind: {
    speedMph: number;
    bearing: number;
  };
  weatherType: string;
  temperatureC: number;
}

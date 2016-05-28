export interface ForecastPoint {
  time: Date;
  humidityPercentage: number;
  precipitationProbabilityPercentage: number;
  wind: {
    speedMph: number;
    direction: string;
  };
  weatherType: string;
  temperatureC: number;
}

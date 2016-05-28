export interface APIResponse {
  hourly: {
    data: APIForecastPoint[];
  };
}

export interface APIForecastPoint {
  time: number;
  summary: string;
  precipProbability: number; // 0 - 1
  temperature: number;
  humidity: number; // 0 - 1
  windSpeed: number;
  windBearing: number;
}

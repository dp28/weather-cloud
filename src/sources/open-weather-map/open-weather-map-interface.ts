export interface APIResponse {
  list: APIForecastPoint[];
}

export interface APIForecastPoint {
  dt: number; // time of forecast
  main: {
    temp: number;
    humidity: number;
  };
  weather: { description: string }[];
  wind: {
    speed: number;
    deg: number;
  }
}

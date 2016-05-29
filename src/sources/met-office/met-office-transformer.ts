import * as R from "ramda";

import { APIResponse, APIDayForecast, WeatherTypes } from "./met-office-interface";
import { ForecastPoint } from "../forecast-point";
import { compassDirectionToBearing } from "../../utils/directions";

export function transformResponse(response: APIResponse): ForecastPoint[] {
  const days = response.SiteRep.DV.Location.Period.map(convertDay);
  return days.reduce(R.concat);
}

function convertDay(dayResponse: APIDayForecast): ForecastPoint[] {
  function timeAt(numMinutes: number) {
    let time = new Date(dayResponse.value);
    time.setMinutes(numMinutes);
    return time;
  }

  return dayResponse.Rep.map(data => ({
    time: timeAt(parseInt(data.$)),
    humidityPercentage: parseInt(data.H),
    precipitationProbabilityPercentage: parseInt(data.Pp),
    wind: {
      speedMph: parseInt(data.S),
      bearing: compassDirectionToBearing(data.D)
    },
    weatherType: WeatherTypes[data.W],
    temperatureC: parseInt(data.T)
  }));
}

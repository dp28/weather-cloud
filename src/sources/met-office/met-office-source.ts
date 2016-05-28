import { Source } from "../source";
import { fetchForecast } from "./met-office-fetcher";

export const MetOffice: Source = {
  id: "met-office",
  name: "Met Office",
  url: "http://www.metoffice.gov.uk/",
  fetchForecast
}

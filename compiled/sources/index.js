var met_office_source_1 = require("./met-office/met-office-source");
var open_weather_map_source_1 = require("./open-weather-map/open-weather-map-source");
var forecast_io_source_1 = require("./forecast-io/forecast-io-source");
exports.Sources = [
    forecast_io_source_1.ForecastIo,
    met_office_source_1.MetOffice,
    open_weather_map_source_1.OpenWeatherMap
];

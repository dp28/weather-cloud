function transformResponse(response) {
    return response.hourly.data.map(transformPoint);
}
exports.transformResponse = transformResponse;
function transformPoint(apiPoint) {
    return {
        time: new Date(apiPoint.time * 1000),
        humidityPercentage: apiPoint.humidity * 100,
        precipitationProbabilityPercentage: apiPoint.precipProbability * 100,
        wind: {
            speedMph: Math.round(apiPoint.windSpeed),
            bearing: apiPoint.windBearing
        },
        weatherType: apiPoint.summary,
        temperatureC: Math.round(apiPoint.temperature)
    };
}

var met_office_fetcher_1 = require("./met-office-fetcher");
exports.MetOffice = {
    id: "met-office",
    name: "Met Office",
    url: "http://www.metoffice.gov.uk/",
    fetchForecast: met_office_fetcher_1.fetchForecast
};

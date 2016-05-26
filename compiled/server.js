'use strict';
var express = require('express');
var routes_1 = require('./routes');
var app = express();
var PORT = process.env.PORT || 3000;
var FORCE_IPv4 = '0.0.0.0';
app.use('/', routes_1.default);
var server = app.listen(PORT, FORCE_IPv4, function () {
    var _a = server.address(), address = _a.address, port = _a.port;
    console.log("weather-cloud listening at http://" + address + ":" + port);
});

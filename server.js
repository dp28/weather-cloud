require("coffee-script/register");

var app = require("./app");

var server = app.listen(process.env.C9_PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('weather-cloud listening at http://%s:%s', host, port);
});
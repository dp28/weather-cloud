express = require 'express'
app = express()

module.exports = app 

app.get '/', (request, response) ->
  response.send 'Hello, World!\n'



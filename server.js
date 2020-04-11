var path = require('path')
var fs = require('fs')
var express = require('express')
var https = require('https')

var certOptions = {
  key: fs.readFileSync(path.resolve('build/cert/server.key')),
  cert: fs.readFileSync(path.resolve('build/cert/server.crt'))
}

var app = express()

var server = https.createServer(certOptions, app).listen(8080)
app.use(express.static('dist'))
// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});
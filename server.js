
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/dist'));

app.listen(8080, '192.168.1.54')

'use strict';

var express = require('express');
var parser = require('body-parser');
var router = require('./api');

var app = express();

require('./database');

app.use('/', express.static('public'));
app.use(parser.json({limit: '50mb'}));
app.use(parser.urlencoded({limit: '50mb'}));
app.use(parser.json());
app.use('/api', router);

app.listen(3000, function() {
    console.log("The server is running on port 3000!");
});

//
// server.js
//
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser')
var logger = require('morgan');
var mongodb = require('./config/mongo.db');
var productroutes_v1 = require('./api/product.routes.v1');
var orderroutes_v1 = require('./api/order.routes.v1');
var supplierroutes_v1 = require('./api/supplier.routes.v1');
var config = require('./config/env/env');

var app = express();
module.exports = {};

// bodyParser zorgt dat we de body uit een request kunnen gebruiken,
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
// configureer de app
app.set('port', (process.env.PORT || config.env.webPort)); 
app.set('env', (process.env.ENV || 'development'))
// Installeer Morgan als logger
app.use(logger('dev'));
// CORS headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// Installeer de routers
app.use('/api/v1', productroutes_v1);
app.use('/api/v1', orderroutes_v1);
app.use('/api/v1', supplierroutes_v1);

// Errorhandler voor express-jwt errors
// Wordt uitgevoerd wanneer err != null; anders door naar next().
app.use(function (err, req, res, next) {
    var error = {
        message: err.message,
        code: err.code,
        name: err.name,
        status: err.status
    }
    res.status(401).send(error);
});

// Fallback - als geen enkele andere route slaagt wordt deze uitgevoerd. 
app.use('*', function (req, res) {
    res.status(400);
    res.json({
        'error': 'Deze URL is niet beschikbaar.'
    });
});

// Installatie klaar; start de server.
app.listen(config.env.webPort, function () {
    console.log('De server luistert op port ' + app.get('port'));
});
module.exports = app;
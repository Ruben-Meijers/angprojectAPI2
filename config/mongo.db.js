const mongoose = require('mongoose');
const config = require('./env/env');//env.js

// Gebruik es6 promises ipv mongoose mpromise
mongoose.Promise = global.Promise;

mongoose.connect(config.dburl);
var connection = mongoose.connection
    .once('open', () => console.log('connected to API'))
    .on('error', (error) => {
        console.warn('Warning', error.toString());
    });

module.exports = connection;
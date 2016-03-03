'use strict';

var app = require('angular').module('databaseApp');

app.factory('dataService', require('./data.service'));
app.factory('userService', require('./user.service'));

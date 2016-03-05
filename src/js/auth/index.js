'use strict';

var app = require('angular').module('databaseApp');

app.controller('loginController', require('./login.controller'));
app.controller('signupController', require('./signup.controller'));

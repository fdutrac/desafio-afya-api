var express = require('express');
var router = express.Router();
const clients = require('./subRoutes/clients');
const users = require('./subRoutes/users');
const login = require('./subRoutes/login');
const home = require('./subRoutes/home');
const specialists = require('./subRoutes/specialist');

/* GET home page. */

const routes = {
  clients, users, login, specialists, home
}
module.exports = routes;

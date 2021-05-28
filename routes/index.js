var express = require('express');
var router = express.Router();
const clients = require('./subRoutes/clients');
const users = require('./subRoutes/users');
const login = require('./subRoutes/login');
const home = require('./subRoutes/home');
const specialists = require('./subRoutes/specialist');
const professions = require('./subRoutes/professions');

const routes = {
  clients, users, login, specialists, home, professions
}

module.exports = routes;

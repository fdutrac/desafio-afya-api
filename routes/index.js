var express = require('express');
var router = express.Router();
const clients = require('./subRoutes/clients');
const users = require('./subRoutes/users');
const login = require('./subRoutes/login');
const home = require('./subRoutes/home');
const specialists = require('./subRoutes/specialist');
const professions = require('./subRoutes/professions');
const medical_record = require('./subRoutes/medicalRecord');

const routes = {
  clients, users, login, specialists, home, professions, medical_record
}

module.exports = routes;

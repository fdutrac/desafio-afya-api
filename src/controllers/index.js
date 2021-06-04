const Users = require('./Users');
const Clients = require('./Clients');
const Specialists = require('./Specialists');
const Professions = require('./Professions');
const MedicalRecords = require('./MedicalRecords');
const Attendances = require('./Attendances');
const Login = require('./Login');

const Controllers = {
  Users, Clients, Specialists, Professions, MedicalRecords, Attendances, Login,
};

module.exports = Controllers;

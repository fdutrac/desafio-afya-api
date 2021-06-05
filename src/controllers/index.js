const Users = require('./Users');
const Clients = require('./Clients');
const Specialists = require('./Specialists');
const Professions = require('./Professions');
const MedicalRecords = require('./MedicalRecords');
const MedicalRecordHistories = require('./MedicalRecordHistories');
const Attendances = require('./Attendances');
const Login = require('./Login');

const Controllers = {
  Users,
  Clients,
  Specialists,
  Professions,
  MedicalRecords,
  MedicalRecordHistories,
  Attendances,
  Login,
};

module.exports = Controllers;

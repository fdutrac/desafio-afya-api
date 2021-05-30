const Users = require('./Users');
const Clients = require('./Clients');
const Specialists = require('./Specialists');
const Professions = require('./Professions');
const MedicalRecord = require('./MedicalRecord');
const Attendance = require('./Attendance');
const Login = require('./Login');

const Controllers = {
    Users, Clients, Specialists, Professions, MedicalRecord, Attendance, Login
}

module.exports = Controllers;
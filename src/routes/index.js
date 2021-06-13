const express = require('express');
const swaggerUi = require('swagger-ui-express');
const { checkSchema } = require('express-validator');

const router = express.Router();

const Authentication = require('../middleware/auth');

const userIsValid = require('../middleware/validation/schemas/User/put-post');
const userExists = require('../middleware/validation/schemas/User/exists');

const clientIsValid = require('../middleware/validation/schemas/Client/put-post');
const clientExists = require('../middleware/validation/schemas/Client/exists');

const specialistIsValid = require('../middleware/validation/schemas/Specialist/put-post');
const specialistExists = require('../middleware/validation/schemas/Specialist/exists');

const attendanceIsValid = require('../middleware/validation/schemas/Attendance/put-post');
const attendanceExists = require('../middleware/validation/schemas/Attendance/exists');
const attendanceValidRequest = require('../middleware/validation/schemas/Attendance/get');

const professionIsValid = require('../middleware/validation/schemas/Profession/put-post');
const professionExists = require('../middleware/validation/schemas/Profession/exists');

const medRecordHistoryIsValid = require('../middleware/validation/schemas/MedicalRecordHistory/put-post');
const medRecordHistoryExists = require('../middleware/validation/schemas/MedicalRecordHistory/exists');

const swaggerDocument = require('../../swagger.json');
const Controllers = require('../controllers/index');

// DOCUMENTAÇÃO
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// LOGIN
// Valida e efetua login
router.post('/login', checkSchema(userIsValid), Controllers.Login.auth);

// CLIENTES
// Lista todos clientes
router.get('/clients', Authentication, Controllers.Clients.get);

// Lista cliente através de consulta por Id
router.get('/clients/:id', Authentication, Controllers.Clients.getOne);

// Atualiza cliente
router.put('/clients/:id', [Authentication, checkSchema(clientIsValid)], Controllers.Clients.update);

// Cria novo cliente
router.post('/clients/', [Authentication, checkSchema(clientIsValid)], Controllers.Clients.insert);

// Deleta um cliente
router.delete('/clients/:id', [Authentication, checkSchema(clientExists)], Controllers.Clients.remove);

// ATENDIMENTOS

// Lista todos atendimentos ou através de filtros
router.get('/attendances', Authentication, checkSchema(attendanceValidRequest), Controllers.Attendances.get);

// Lista um attendances por Id
router.get('/attendances/:id', Authentication, Controllers.Attendances.getOne);

// Atualiza atendimento
router.put('/attendances/:id', [Authentication, checkSchema(attendanceIsValid)], Controllers.Attendances.update);

// Cria novo atendimento
router.post('/attendances', [Authentication, checkSchema(attendanceIsValid)], Controllers.Attendances.insert);

// Deleta atendimento
router.delete('/attendances/:id', [Authentication, checkSchema(attendanceExists)], Controllers.Attendances.remove);

// PRONTUÁRIOS

router.get('/medical-records', Authentication, Controllers.MedicalRecords.get);

router.get('/medical-records/:id', Authentication, Controllers.MedicalRecords.getOne);

router.put('/medical-records/:id', Authentication, Controllers.MedicalRecords.update);

router.post('/medical-records', Authentication, Controllers.MedicalRecords.insert);

router.delete('/medical-records/:id', Authentication, Controllers.MedicalRecords.remove);

// HISTÓRICOS DE PRONTUÁRIO

router.get('/medical-record-histories', Authentication, Controllers.MedicalRecordHistories.get);

router.get('/medical-record-histories/:id', Authentication, Controllers.MedicalRecordHistories.getOne);

router.put('/medical-record-histories/:id', Authentication, checkSchema(medRecordHistoryIsValid), Controllers.MedicalRecordHistories.update);

router.post('/medical-record-histories', [Authentication, checkSchema(medRecordHistoryIsValid)], Controllers.MedicalRecordHistories.insert);

router.delete('/medical-record-histories/:id', [Authentication, checkSchema(medRecordHistoryExists)], Controllers.MedicalRecordHistories.remove);

// PROFISSÕES

router.get('/professions', Authentication, Controllers.Professions.get);

router.get('/professions/:id', Authentication, Controllers.Professions.getOne);

router.put('/professions/:id', [Authentication, checkSchema(professionIsValid)], Controllers.Professions.update);

router.post('/professions', [Authentication, checkSchema(professionIsValid)], Controllers.Professions.insert);

router.delete('/professions/:id', [Authentication, checkSchema(professionExists)], Controllers.Professions.remove);

// ESPECIALISTAS

router.get('/specialists', Authentication, Controllers.Specialists.get);

router.get('/specialists/:id', Authentication, Controllers.Specialists.getOne);

router.put('/specialists/:id', [Authentication, checkSchema(specialistIsValid)], Controllers.Specialists.update);

router.post('/specialists', [Authentication, checkSchema(specialistIsValid)], Controllers.Specialists.insert);

router.delete('/specialists/:id', [Authentication, checkSchema(specialistExists)], Controllers.Specialists.remove);

// USUARIOS

router.get('/users', Authentication, Controllers.Users.get);

router.get('/users/:id', Authentication, Controllers.Users.getOne);

router.put('/users/:id', [Authentication, checkSchema(userIsValid)], Controllers.Users.update);

router.post('/users', checkSchema(userIsValid), Controllers.Users.insert);

router.delete('/users/:id', [Authentication, checkSchema(userExists)], Controllers.Users.remove);

module.exports = router;

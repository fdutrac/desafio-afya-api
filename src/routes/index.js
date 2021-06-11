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
router.get('/clientes', Authentication, Controllers.Clients.get);

// Lista cliente através de consulta por Id
router.get('/clientes/:id', Authentication, Controllers.Clients.getOne);

// Atualiza cliente
router.put('/clientes/:id', [Authentication, checkSchema(clientIsValid)], Controllers.Clients.update);

// Cria novo cliente
router.post('/clientes/', [Authentication, checkSchema(clientIsValid)], Controllers.Clients.insert);

// Deleta um cliente
router.delete('/clientes/:id', [Authentication, checkSchema(clientExists)], Controllers.Clients.remove);

// ATENDIMENTOS

// Lista todos atendimentos ou através de filtros
router.get('/atendimentos', Authentication, checkSchema(attendanceValidRequest), Controllers.Attendances.get);

// Lista um atendimentos por Id
router.get('/atendimentos/:id', Authentication, Controllers.Attendances.getOne);

// Atualiza atendimento
router.put('/atendimentos/:id', [Authentication, checkSchema(attendanceIsValid)], Controllers.Attendances.update);

// Cria novo atendimento
router.post('/atendimentos', [Authentication, checkSchema(attendanceIsValid)], Controllers.Attendances.insert);

// Deleta atendimento
router.delete('/atendimentos/:id', [Authentication, checkSchema(attendanceExists)], Controllers.Attendances.remove);

// PRONTUÁRIOS

router.get('/prontuarios', Authentication, Controllers.MedicalRecords.get);

router.get('/prontuarios/:id', Authentication, Controllers.MedicalRecords.getOne);

router.put('/prontuarios/:id', Authentication, Controllers.MedicalRecords.update);

router.post('/prontuarios', Authentication, Controllers.MedicalRecords.insert);

router.delete('/prontuarios/:id', Authentication, Controllers.MedicalRecords.remove);

// HISTÓRICOS DE PRONTUÁRIO

router.get('/historicos_prontuario', Authentication, Controllers.MedicalRecordHistories.get);

router.get('/historicos_prontuario/:id', Authentication, Controllers.MedicalRecordHistories.getOne);

router.put('/historicos_prontuario/:id', Authentication, checkSchema(medRecordHistoryIsValid), Controllers.MedicalRecordHistories.update);

router.post('/historicos_prontuario', [Authentication, checkSchema(medRecordHistoryIsValid)], Controllers.MedicalRecordHistories.insert);

router.delete('/historicos_prontuario/:id', [Authentication, checkSchema(medRecordHistoryExists)], Controllers.MedicalRecordHistories.remove);

// PROFISSÕES

router.get('/profissoes', Authentication, Controllers.Professions.get);

router.get('/profissoes/:id', Authentication, Controllers.Professions.getOne);

router.put('/profissoes/:id', Authentication, Controllers.Professions.update);

router.post('/profissoes', Authentication, Controllers.Professions.insert);

router.delete('/profissoes/:id', Authentication, Controllers.Professions.remove);

// ESPECIALISTAS

router.get('/especialistas', Authentication, Controllers.Specialists.get);

router.get('/especialistas/:id', Authentication, Controllers.Specialists.getOne);

router.put('/especialistas/:id', [Authentication, checkSchema(specialistIsValid)], Controllers.Specialists.update);

router.post('/especialistas', [Authentication, checkSchema(specialistIsValid)], Controllers.Specialists.insert);

router.delete('/especialistas/:id', [Authentication, checkSchema(specialistExists)], Controllers.Specialists.remove);

// USUARIOS

router.get('/usuarios', Controllers.Users.get);

router.get('/usuarios/:id', Controllers.Users.getOne);

router.put('/usuarios/:id', checkSchema(userIsValid), Controllers.Users.update);

router.post('/usuarios', checkSchema(userIsValid), Controllers.Users.insert);

router.delete('/usuarios/:id', checkSchema(userExists), Controllers.Users.remove);

module.exports = router;

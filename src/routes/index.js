const express = require('express');
const swaggerUi = require('swagger-ui-express');
const { checkSchema } = require('express-validator');

const router = express.Router();

const userIsValid = require('../middleware/validation/schemas/User/put-post');
const userExists = require('../middleware/validation/schemas/User/exists');
const clientIsValid = require('../middleware/validation/schemas/Client/put-post');
const clientExists = require('../middleware/validation/schemas/Client/exists');
const specialistIsValid = require('../middleware/validation/schemas/Specialist/put-post');
const specialistExists = require('../middleware/validation/schemas/Specialist/exists');
const attendanceIsValid = require('../middleware/validation/schemas/Attendance/put-post');
const attendanceExists = require('../middleware/validation/schemas/Attendance/exists');
const attendanceValidRequest = require('../middleware/validation/schemas/Attendance/get');

const swaggerDocument = require('../../swagger.json');
const Controllers = require('../controllers/index');

// DOCUMENTAÇÃO
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// LOGIN
// Valida e efetua login
router.post('/login', checkSchema(userIsValid), Controllers.Login.auth);

// CLIENTES
// Lista todos clientes
router.get('/clientes', Controllers.Clients.get);

// Lista cliente através de consulta por Id
router.get('/clientes/:id', Controllers.Clients.getOne);

// Atualiza cliente
router.put('/clientes/:id', checkSchema(clientIsValid), Controllers.Clients.update);

// Cria novo cliente
router.post('/clientes/', checkSchema(clientIsValid), Controllers.Clients.insert);

// Deleta um cliente
router.delete('/clientes/:id', checkSchema(clientExists), Controllers.Clients.remove);

// ATENDIMENTOS

// Lista todos atendimentos ou através de filtros
router.get('/atendimentos', checkSchema(attendanceValidRequest), Controllers.Attendances.get);

// Lista um atendimentos por Id
router.get('/atendimentos', checkSchema(attendanceValidRequest), Controllers.Attendances.getOne);

// Atualiza atendimento
router.put('/atendimentos/:id', checkSchema(attendanceIsValid), Controllers.Attendances.update);

// Cria novo atendimento
router.post('/atendimentos', checkSchema(attendanceIsValid), Controllers.Attendances.insert);

// Deleta atendimento
router.delete('/atendimentos/:id', checkSchema(attendanceExists), Controllers.Attendances.remove);

// PRONTUÁRIOS

router.get('/prontuarios', Controllers.MedicalRecords.get);

router.get('/prontuarios/:id', Controllers.MedicalRecords.getOne);

router.put('/prontuarios/:id', Controllers.MedicalRecords.update);

router.post('/prontuarios', Controllers.MedicalRecords.insert);

router.delete('/prontuarios/:id', Controllers.MedicalRecords.remove);

// HISTÓRICOS DE PRONTUÁRIO

router.get('/prontuarios', Controllers.MedicalRecordHistories.get);

router.get('/prontuarios/:id', Controllers.MedicalRecordHistories.getOne);

router.put('/prontuarios/:id', Controllers.MedicalRecordHistories.update);

router.post('/prontuarios', Controllers.MedicalRecordHistories.insert);

router.delete('/prontuarios/:id', Controllers.MedicalRecordHistories.remove);

// PROFISSÕES

/* GET Professions listing. */
router.get('/profissoes', Controllers.Professions.get);

router.get('/profissoes/:id', Controllers.Professions.getOne);

router.put('/profissoes/:id', Controllers.Professions.update);

router.post('/profissoes', Controllers.Professions.insert);

router.delete('/profissoes/:id', Controllers.Professions.remove);

// ESPECIALISTAS

router.get('/especialistas', Controllers.Specialists.get);

router.get('/especialistas/:id', Controllers.Specialists.getOne);

router.put('/especialistas/:id', checkSchema(specialistIsValid), Controllers.Specialists.update);

router.post('/especialistas', checkSchema(specialistIsValid), Controllers.Specialists.insert);

router.delete('/especialistas/:id', checkSchema(specialistExists), Controllers.Specialists.remove);

// USUARIOS

router.get('/usuarios', Controllers.Users.get);

router.get('/usuarios/:id', Controllers.Users.getOne);

router.put('/usuarios/:id', checkSchema(userIsValid), Controllers.Users.update);

router.post('/usuarios', checkSchema(userIsValid), Controllers.Users.insert);

router.delete('/usuarios/:id', checkSchema(userExists), Controllers.Users.remove);

module.exports = router;

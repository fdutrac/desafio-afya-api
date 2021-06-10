const express = require('express');
const swaggerUi = require('swagger-ui-express');
const { checkSchema } = require('express-validator');

const router = express.Router();

const userIsValid = require('../middleware/validation/schemas/User/put-post');
const userExists = require('../middleware/validation/schemas/User/exists');
const clientSchema = require('../middleware/validation/schemas/ClientSchema');
const specialistSchema = require('../middleware/validation/schemas/SpecialistSchema');

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

// Lista clientes através de consulta por Id
router.get('/clientes/:id', Controllers.Clients.getById);

// Atualiza cliente
router.put('/clientes/:id', checkSchema(clientSchema.isValid), Controllers.Clients.update);

// Cria novo cliente
router.post('/clientes/', checkSchema(clientSchema.isValid), Controllers.Clients.insert);

// Deleta um cliente
router.delete('/clientes/:id', checkSchema(clientSchema.exists), Controllers.Clients.remove);

// ATENDIMENTOS

// Lista todos atendimentos ou através de filtros
router.get('/atendimentos', Controllers.Attendances.get);

// Atualiza atendimento
router.put('/atendimentos/:id', Controllers.Attendances.update);

// Cria novo atendimento
router.post('/atendimentos', Controllers.Attendances.insert);

// Deleta atendimento
router.delete('/atendimentos/:id', Controllers.Attendances.remove);

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

router.put('/profissoes/:id', Controllers.Professions.update);

router.post('/profissoes', Controllers.Professions.insert);

router.delete('/profissoes/:id', Controllers.Professions.remove);

// ESPECIALISTAS

router.get('/especialistas', Controllers.Specialists.get);

router.get('/especialistas/:id', Controllers.Specialists.getById);

router.put('/especialistas/:id', checkSchema(specialistSchema.isValid), Controllers.Specialists.update);

router.post('/especialistas', checkSchema(specialistSchema.isValid), Controllers.Specialists.insert);

router.delete('/especialistas/:id', checkSchema(specialistSchema.exists), Controllers.Specialists.remove);

// USUARIOS

router.get('/usuarios', Controllers.Users.get);

router.put('/usuarios/:id', checkSchema(userIsValid), Controllers.Users.update);

router.post('/usuarios', checkSchema(userIsValid), Controllers.Users.insert);

router.delete('/usuarios/:id', checkSchema(userExists), Controllers.Users.remove);

module.exports = router;

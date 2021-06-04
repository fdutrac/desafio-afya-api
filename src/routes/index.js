const express = require('express');

const router = express.Router();

const Controllers = require('../controllers/index');

// HOME PAGE
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

// LOGIN
// Valida e efetua login
router.post('/login', Controllers.Login.auth);

// CLIENTES
// Lista todos clientes
router.get('/clientes', Controllers.Clients.get);

// Lista clientes através de consulta por Id
router.get('/clientes/:id', Controllers.Clients.getById);

// Atualiza cliente
router.put('/clientes/:id', Controllers.Clients.update);

// Cria novo cliente
router.post('/clientes/', Controllers.Clients.insert);

// Deleta um cliente
router.delete('/clientes/:id', Controllers.Clients.remove);

// ATENDIMENTOS

// Lista todos atendimentos ou através de filtros
router.get('/atendimentos', Controllers.Attendance.getAll);

// Lista atendimento através de consulta por Id
router.get('/atendimentos/:id', Controllers.Attendance.getOne);

// Atualiza atendimento
router.put('/atendimentos/:id', Controllers.Attendance.update);

// Cria novo atendimento
router.post('/atendimentos', Controllers.Attendance.insert);

// Deleta atendimento
router.delete('/atendimentos/:id', Controllers.Attendance.remove);

// PRONTUÁRIOS

router.get('/prontuarios', Controllers.MedicalRecord.getAll);

router.get('/prontuarios/:id', Controllers.MedicalRecord.getOne);

router.put('/prontuarios/:id', Controllers.MedicalRecord.update);

router.post('/prontuarios', Controllers.MedicalRecord.insert);

router.delete('/prontuarios/:id', Controllers.MedicalRecord.remove);

// PROFISSÕES

/* GET Professions listing. */
router.get('/profissoes', Controllers.Professions.getAll);

router.get('/profissoes/:id', Controllers.Professions.getOne);

router.put('/profissoes/:id', Controllers.Professions.update);

router.post('/profissoes', Controllers.Professions.insert);

router.delete('/profissoes/:id', Controllers.Professions.remove);

// ESPECIALISTAS

router.get('/especialistas', Controllers.Specialists.getAll);

router.get('/especialistas/:id', Controllers.Specialists.getOne);

router.put('/especialistas/:id', Controllers.Specialists.update);

router.post('/especialistas', Controllers.Specialists.insert);

router.delete('/especialistas/:id', Controllers.Specialists.remove);

// USUARIOS

router.get('/usuarios', Controllers.Users.get);

router.put('/usuarios/:id', Controllers.Users.update);

router.post('/usuarios', Controllers.Users.insert);

router.delete('/usuarios/:id', Controllers.Users.remove);

module.exports = router;

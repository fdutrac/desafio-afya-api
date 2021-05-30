const { getConnection } = require('typeorm');

async function getAll(req, res) {
  try {
    const findArguments = { relations: ['client', 'specialist'] };

    // Verifica se existe algum filtro para seleção
    if (req.body) { findArguments.where = req.body; }

    const AttendancesRepository = getConnection().getRepository('Attendance');
    const allAttendances = await AttendancesRepository.find(findArguments);
    res.json(allAttendances);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getOne(req, res) {
  try {
    const AttendancesRepository = getConnection().getRepository('Attendance');
    const AttendanceData = await AttendancesRepository.findOne(req.params.id, { relations: ['client', 'specialist'] });
    res.json(AttendanceData);
  } catch (err) {
    res.json(err);
  }
}

async function update(req, res) {
  try {
    const AttendancesRepository = getConnection().getRepository('Attendance');
    const AttendanceData = await AttendancesRepository.findOne(req.params.id, { relations: ['client', 'specialist'] });
    AttendancesRepository.merge(AttendanceData, req.body);
    const results = await AttendancesRepository.save(AttendanceData);
    res.json(results);
  } catch (err) {
    res.json(err);
  }
}

async function insert(req, res) {
  try {
    const AttendancesRepository = getConnection().getRepository('Attendance');
    const results = await AttendancesRepository.save(req.body);
    res.json(results);
  } catch (err) {
    res.json(err);
  }
}

async function remove(req, res) {
  try {
    const AttendancesRepository = getConnection().getRepository('Attendance');
    const results = AttendancesRepository.delete(req.params.id);
    res.json(results);
  } catch (err) {
    res.json(err);
  }
}

module.exports = {
  getAll, getOne, insert, update, remove,
};

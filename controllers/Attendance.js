const getConnection = require('typeorm').getConnection

/* GET Attendance listing. */
async function getAll() {
    const AttendancesRepository = getConnection().getRepository("Attendance");
    const allAttendances = await AttendancesRepository.find({relations: ["client", "specialist"]});
    return allAttendances;
}

async function getAll(conditions) {
    const findArguments = {relations: ["client", "specialist"]}

    //Verifica se existe algum filtro para seleção
    if (conditions) { findArguments.where = conditions }

    const AttendancesRepository = getConnection().getRepository("Attendance");
    const allAttendances = await AttendancesRepository.find(findArguments);
    return allAttendances;
}


async function getOne(id) {
    const AttendancesRepository = getConnection().getRepository("Attendance");
    const AttendanceData = await AttendancesRepository.findOne(id, {relations: ["client", "specialist"]});
    return AttendanceData;
}
async function update(id, data) {
    const AttendancesRepository = getConnection().getRepository("Attendance");
    const AttendanceData = await AttendancesRepository.findOne(id, {relations: ["client", "specialist"]});
    AttendancesRepository.merge(Medical_RecordData, data);
    const results = await AttendancesRepository.save(Medical_RecordData);
    return results;
}

async function insert(data) {
    const AttendancesRepository = getConnection().getRepository("Attendance");
    const results = await AttendancesRepository.save(data);
    return results;
}

async function remove(id) {
    const AttendancesRepository = getConnection().getRepository("Attendance");
    const results = AttendancesRepository.delete(id);
    return results;
}
module.exports = { getAll, getOne, insert, update, remove }
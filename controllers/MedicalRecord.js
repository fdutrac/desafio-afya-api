const getConnection = require('typeorm').getConnection

/* GET Medical_Record listing. */
async function getAll() {
    const MedicalRecordsRepository = getConnection().getRepository("Medical_Record");
    const allMedicalRecords = await MedicalRecordsRepository.find({relations: ["client"]});
    return allMedicalRecords;
}

async function getOne(id) {
    const MedicalRecordsRepository = getConnection().getRepository("Medical_Record");
    const Medical_RecordData = await MedicalRecordsRepository.findOne(id, {relations: ["client"]});
    return Medical_RecordData;
}
async function update(id, data) {
    const MedicalRecordsRepository = getConnection().getRepository("Medical_Record");
    const Medical_RecordData = await MedicalRecordsRepository.findOne(id);
    MedicalRecordsRepository.merge(Medical_RecordData, data);
    const results = await MedicalRecordsRepository.save(Medical_RecordData);
    return results;
}

async function insert(data) {
    const MedicalRecordsRepository = getConnection().getRepository("Medical_Record");
    const results = await MedicalRecordsRepository.save(data);
    return results;
}

async function remove(id) {
    const MedicalRecordsRepository = getConnection().getRepository("Medical_Record");
    const results = MedicalRecordsRepository.delete(id);
    return results;
}
module.exports = { getAll, getOne, insert, update, remove }
const getConnection = require('typeorm').getConnection

/* GET Medical_Record listing. */
async function getAll(req, res) {
    try {
        const MedicalRecordsRepository = getConnection().getRepository("Medical_Record");
        const allMedicalRecords = await MedicalRecordsRepository.find({relations: ["client"]});
        res.json(allMedicalRecords);
    } catch (err) {
        res.json(err)
    }
}

async function getOne(req, res) {
    try {
        const MedicalRecordsRepository = getConnection().getRepository("Medical_Record");
        const Medical_RecordData = await MedicalRecordsRepository.findOne(req.params.id, {relations: ["client"]});
        res.json(Medical_RecordData);
    } catch (err) {
        res.json(err)
    }
}
async function update(req, res) {
    try {
        const MedicalRecordsRepository = getConnection().getRepository("Medical_Record");
        const Medical_RecordData = await MedicalRecordsRepository.findOne(req.params.id);
        MedicalRecordsRepository.merge(Medical_RecordData, req.body);
        const results = await MedicalRecordsRepository.save(Medical_RecordData);
        res.json(results);
    } catch (err) {
        res.json(err)
    }
}

async function insert(req, res) {
    try {
        const MedicalRecordsRepository = getConnection().getRepository("Medical_Record");
        const results = await MedicalRecordsRepository.save(req.body);
        res.json(results);
    } catch (err) {
        res.json(err)
    }
}

async function remove(req, res) {
    try {
        const MedicalRecordsRepository = getConnection().getRepository("Medical_Record");
        const results = MedicalRecordsRepository.delete(req.params.id);
        res.json(results);
    } catch (err) {
        res.json(err)
    }
}

module.exports = { getAll, getOne, insert, update, remove }

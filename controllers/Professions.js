const getConnection = require('typeorm').getConnection

/* GET Profession listing. */
async function getAll() {
    const ProfessionsRepository = getConnection().getRepository("Profession");
    const allProfessions = await ProfessionsRepository.find();
    return allProfessions;
}

async function getOne(id) {
    const ProfessionsRepository = getConnection().getRepository("Profession");
    const ProfessionData = await ProfessionsRepository.findOne(id);
    return ProfessionData;
}
async function update(id, data) {
    const ProfessionsRepository = getConnection().getRepository("Profession");
    const ProfessionData = await ProfessionsRepository.findOne(id);
    ProfessionsRepository.merge(ProfessionData, data);
    const results = await ProfessionsRepository.save(ProfessionData);
    return results;
}

async function insert(data) {
    const ProfessionsRepository = getConnection().getRepository("Profession");
    const results = await ProfessionsRepository.save(data);
    return results;
}

async function remove(id) {
    const ProfessionsRepository = getConnection().getRepository("Profession");
    const results = ProfessionsRepository.delete(id);
    return results;
}
module.exports = { getAll, getOne, insert, update, remove }
const getConnection = require('typeorm').getConnection

/* GET Specialists listing. */
async function getAll() {
    const SpecialistRepository = getConnection().getRepository("Specialist");
    const allSpecialists = await SpecialistRepository.find({relations: ["profession"]});
    return allSpecialists;
}

async function getOne(id) {
    const SpecialistRepository = getConnection().getRepository("Specialist");
    const SpecialistData = await SpecialistRepository.findOne(id, {relations: ["profession"]});
    return SpecialistData;
}
async function update(id, data) {
    const SpecialistRepository = getConnection().getRepository("Specialist");
    const SpecialistData = await SpecialistRepository.findOne(id);
    SpecialistRepository.merge(SpecialistData, data);
    const results = await SpecialistRepository.save(SpecialistData);
    return results;
}

async function insert(data) {
    const SpecialistRepository = getConnection().getRepository("Specialist");
    const results = await SpecialistRepository.save(data);
    return results;
}

async function remove(id) {
    const SpecialistRepository = getConnection().getRepository("Specialist");
    // const Specialist = SpecialistRepository.findOne(id);
    const results = SpecialistRepository.delete(id);
    return results;
}
module.exports = { getAll, getOne, insert, update, remove }
const getConnection = require('typeorm').getConnection

/* GET Specialists listing. */
async function getAll() {
    console.log(getConnection().getRepository("Specialist"))
    try {
        const SpecialistRepository = getConnection().getRepository("Specialist");        
        const allSpecialists = await SpecialistRepository.find();
        return allSpecialists;
    } catch (err) {
        return err;
    }
}

async function getOne(id) {
    try {
        const SpecialistRepository = getConnection().getRepository("Specialist");        
        const SpecialistData = await SpecialistRepository.findOne(id);
        return SpecialistData;
    } catch (err) {
        return err;
    }
}
async function update(id, data) {
    try {
        const SpecialistRepository = getConnection().getRepository("Specialist");        
        const SpecialistData = await SpecialistRepository.findOne(id);
        SpecialistRepository.merge(SpecialistData, data);
        const results = await SpecialistRepository.save(SpecialistData);
        return results;
    } catch (err) {
        return err;
    }
}

async function insert(data) {
    try {
        const SpecialistRepository = getConnection().getRepository("Specialist");               
        const results = await SpecialistRepository.save(data);
        return results;
    } catch (err) {
        return err;
    }
}

async function remove(id) {
    try {
        const SpecialistRepository = getConnection().getRepository("Specialist");
        // const Specialist = SpecialistRepository.findOne(id);
        const results = SpecialistRepository.delete(id);
        return results;           
    } catch (err) {
        return err;
    }
}
module.exports = { getAll, getOne, insert, update, remove }
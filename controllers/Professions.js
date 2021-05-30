const getConnection = require('typeorm').getConnection

/* GET Profession listing. */
async function getAll(req, res) {
    try {
        const ProfessionsRepository = getConnection().getRepository("Profession");
        const allProfessions = await ProfessionsRepository.find();
        res.json(allProfessions);
    } catch(err) {
        res.json(err)
    }
}

async function getOne(req, res) {
    try {
        const ProfessionsRepository = getConnection().getRepository("Profession");
        const ProfessionData = await ProfessionsRepository.findOne(req.params.id);
        res.json(ProfessionData);
    } catch(err) {
        res.json(err)
    }
}

async function update(req, res) {
    try {
        const ProfessionsRepository = getConnection().getRepository("Profession");
        const ProfessionData = await ProfessionsRepository.findOne(req.params.id);
        ProfessionsRepository.merge(ProfessionData, req.body);
        const results = await ProfessionsRepository.save(ProfessionData);
        res.json(results);
    } catch(err) {
        res.json(err)
    }
}

async function insert(req, res) {
    try {
        const ProfessionsRepository = getConnection().getRepository("Profession");
        const results = await ProfessionsRepository.save(req.body);
        res.json(results);
    } catch(err) {
        res.json(err)
    }
}

async function remove(req, res) {
    try {
        const ProfessionsRepository = getConnection().getRepository("Profession");
        const results = ProfessionsRepository.delete(req.params.id);
        res.json(results);
    } catch(err) {
        res.json(err)
    }
}

module.exports = { getAll, getOne, insert, update, remove }

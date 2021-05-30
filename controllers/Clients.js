const getConnection = require('typeorm').getConnection

/* GET clients listing. */
async function getAll(req, res) {
    try {
        const clientRepository = getConnection().getRepository("Client");        
        const allClients = await clientRepository.find({relations: ["address"]});
        res.json(allClients);
    } catch (err) {
        res.json(err)
    }
}
async function getOne(req, res) {
    try {
        const clientRepository = getConnection().getRepository("Client");        
        const clientData = await clientRepository.findOne(req.params.id);
        res.json(clientData);
    } catch (err) {
        res.json(err)
    }
    
}
async function update(req, res) {
    try {
        const clientRepository = getConnection().getRepository("Client");        
        const clientData = await clientRepository.findOne(req.params.id);
        clientRepository.merge(clientData, req.body);
        const results = await clientRepository.save(clientData);
        res.json(results);
    } catch (err) {
        res.json(err)
    }
}

async function insert(req, res) {
    try {
        const clientRepository = getConnection().getRepository("Client");               
        const results = await clientRepository.save(req.body);
        res.json(results);
    } catch (err) {
        res.json(err)
    }
}

async function remove(req, res) {
    try {
    
        const clientRepository = getConnection().getRepository("Client");
        const results = clientRepository.delete(req.params.id);
        res.json(results);
    } catch (err) {
        res.json(err)
    }
}
module.exports = { getAll, getOne, insert, update, remove }

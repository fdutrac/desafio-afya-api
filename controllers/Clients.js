const getConnection = require('typeorm').getConnection

/* GET clients listing. */
async function getAll() {
    const clientRepository = getConnection().getRepository("Client");        
    const allClients = await clientRepository.find({relations: ["address"]});
    return allClients;
}

async function getOne(id) {
    const clientRepository = getConnection().getRepository("Client");        
    const clientData = await clientRepository.findOne(id);
    return clientData;

}
async function update(id, data) {
    const clientRepository = getConnection().getRepository("Client");        
    const clientData = await clientRepository.findOne(id);
    clientRepository.merge(clientData, data);
    const results = await clientRepository.save(clientData);
    return results;
}

async function insert(data) {
    const clientRepository = getConnection().getRepository("Client");               
    const results = await clientRepository.save(data);
    return results;
}

async function remove(id) {
    const clientRepository = getConnection().getRepository("Client");
    const results = clientRepository.delete(id);
    return results;
}
module.exports = { getAll, getOne, insert, update, remove }
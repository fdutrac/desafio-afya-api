const getConnection = require('typeorm').getConnection

/* GET clients listing. */
async function getClients() {
    console.log(getConnection().getRepository("Client"))
    try {
        const clientRepository = getConnection().getRepository("Client");        
        const allclients = await clientRepository.find();
        return allclients;
    } catch (err) {
        return err;
    }
}

async function getClient(id) {
    try {
        const clientRepository = getConnection().getRepository("Client");        
        const clientData = await clientRepository.findOne(id);
        return clientData;
    } catch (err) {
        return err;
    }
}
async function updateClient(id, data) {
    try {
        const clientRepository = getConnection().getRepository("Client");        
        const clientData = await clientRepository.findOne(id);
        clientRepository.merge(clientData, data);
        const results = await clientRepository.save(clientData);
        return results;
    } catch (err) {
        return err;
    }
}

async function insertClient(data) {
    try {
        const clientRepository = getConnection().getRepository("Client");               
        const results = await clientRepository.save(data);
        return results;
    } catch (err) {
        return err;
    }
}

async function deleteClient(id) {
    try {
        const clientRepository = getConnection().getRepository("Client");
        // const client = clientRepository.findOne(id);
        const results = clientRepository.delete(id);
        return results;           
    } catch (err) {
        return err;
    }
}
module.exports = { getClients, getClient, insertClient, updateClient, deleteClient }
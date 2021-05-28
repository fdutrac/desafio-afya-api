const express = require('express');
const router = express.Router();

const Controllers = require('../../controllers/index');


/* GET clients listing. */
router.get('/', async function(req, res, next) {
    try {
      const clients = await Controllers.Clients.getAll();
      res.json(clients);
    }  catch(err){
      res.send(err);
    }
});

router.get('/:id', async function(req, res, next) {
  try {
    const client = await Controllers.Clients.getOne(req.params.id);
    res.json(client);
  }  catch(err){
    res.send(err);
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    const client = await Controllers.Clients.update(req.params.id, req.body);
    res.json(client);
  } catch(err) {
    res.send(err);
  }
})

router.post('/', async function(req, res, next) {
  try {
    const client = await Controllers.Clients.insert(req.body);
    res.json(client);

  } catch(err){
    res.send(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    const results = await Controllers.Clients.remove(req.params.id)
    connection.close();
    res.json(results);

  } catch(err) {
    res.send(err)
  }
})

module.exports = router;

const express = require('express');
const createConnection = require('typeorm').createConnection;
const router = express.Router();

const userController = require('../controllers/Users');


/* GET users listing. */
router.get('/', async function(req, res, next) {
    try {
      const user = await userController.getUsers();
      res.json(user);
    }  catch(err){
      res.send(err);
    }
});

router.get('/:id', async function(req, res, next) {
  try {
    const user = await userController.getUser(req.params.id);
    res.json(user);
  }  catch(err){
    res.send(err);
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    const user = await userController.updateUser(req.params.id, req.body);
    res.json(user)
  } catch(err) {
    res.send(err)
  }
})

router.post('/', async function(req, res, next) {
  try {
    const user = await userController.insertUser(req.body);
    res.json(user);
  }  catch(err){
    res.send(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    id = req.params.id
    const connection = await createConnection();
    const repository = connection.getRepository('User');
    const user = await repository.findOne(id);
    const results = await repository.delete(user)
    connection.close();
    res.send(JSON.stringify(results))

  } catch(err) {
    res.send(err)
  }
})

module.exports = router;

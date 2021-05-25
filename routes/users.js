const express = require('express');
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
    res.json(user);
  } catch(err) {
    res.send(err);
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
    const results = await userController.deleteUser(req.params.id)
    connection.close();
    res.json(results);

  } catch(err) {
    res.send(err)
  }
})

module.exports = router;

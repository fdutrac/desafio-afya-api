const express = require('express');
const router = express.Router();

const Controllers = require('../../controllers/index');


/* GET users listing. */
router.get('/', async function(req, res, next) {
    try {
      const user = await Controllers.Users.getAll();
      res.json(user);
    }  catch(err){
      res.send(err);
    }
});

router.get('/:id', async function(req, res, next) {
  try {
    const user = await Controllers.Users.getOne(req.params.id);
    res.json(user);
  }  catch(err){
    res.send(err);
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    const user = await Controllers.Users.update(req.params.id, req.body);
    res.json(user);
  } catch(err) {
    res.send(err);
  }
})

router.post('/', async function(req, res, next) {
  try {
    const user = await Controllers.Users.insert(req.body);
    res.json(user);
  }  catch(err){
    res.send(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    const results = await Controllers.Users.remove(req.params.id)
    connection.close();
    res.json(results);

  } catch(err) {
    res.send(err)
  }
})

module.exports = router;

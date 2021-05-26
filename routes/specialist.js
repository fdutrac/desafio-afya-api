const express = require('express');
const router = express.Router();

const Controllers = require('../controllers/index');


/* GET specialists listing. */
router.get('/', async function(req, res, next) {
    try {
      const specialists = await Controllers.Specialists.getAll();
      res.json(specialists);
    }  catch(err){
      res.send(err);
    }
});

router.get('/:id', async function(req, res, next) {
  try {
    const specialist = await Controllers.Specialists.getOne(req.params.id);
    res.json(specialist);
  }  catch(err){
    res.send(err);
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    const specialist = await Controllers.Specialists.update(req.params.id, req.body);
    res.json(specialist);
  } catch(err) {
    res.send(err);
  }
})

router.post('/', async function(req, res, next) {
  try {
    const specialist = await Controllers.Specialists.insert(req.body);
    res.json(specialist);
  }  catch(err){
    res.send(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    const results = await Controllers.Specialists.remove(req.params.id)
    connection.close();
    res.json(results);

  } catch(err) {
    res.send(err)
  }
})

module.exports = router;

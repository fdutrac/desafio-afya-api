const express = require('express');
const router = express.Router();

const Controllers = require('../../controllers/index');


/* GET Professions listing. */
router.get('/', async function(req, res, next) {
    try {
      const pofessions = await Controllers.Professions.getAll();
      res.json(professions);
    }  catch(err){
      res.send(err);
    }
});

router.get('/:id', async function(req, res, next) {
  try {
    const profession = await Controllers.Professions.getOne(req.params.id);
    res.json(profession);
  }  catch(err){
    res.send(err);
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    const profession = await Controllers.Professions.update(req.params.id, req.body);
    res.json(profession);
  } catch(err) {
    res.send(err);
  }
})

router.post('/', async function(req, res, next) {
  try {
    const profession = await Controllers.Professions.insert(req.body);
    res.json(profession);
  }  catch(err){
    res.send(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    const results = await Controllers.Professions.remove(req.params.id)
    res.json(results);

  } catch(err) {
    res.send(err)
  }
})

module.exports = router;

const express = require('express');
const router = express.Router();

const Controllers = require('../../controllers/index');


/* GET MedicalRecord listing. */
router.get('/', async function(req, res, next) {
    try {
      const medical_records = await Controllers.MedicalRecord.getAll();
      res.json(medical_records);
    }  catch(err){
      res.send(err);
    }
});

router.get('/:id', async function(req, res, next) {
  try {
    const medical_record = await Controllers.MedicalRecord.getOne(req.params.id);
    res.json(medical_record);
  }  catch(err){
    res.send(err);
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    const medical_record = await Controllers.MedicalRecord.update(req.params.id, req.body);
    res.json(medical_record);
  } catch(err) {
    res.send(err);
  }
})

router.post('/', async function(req, res, next) {
  try {
    const medical_record = await Controllers.MedicalRecord.insert(req.body);
    res.json(medical_record);
  }  catch(err){
    res.send(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    const results = await Controllers.MedicalRecord.remove(req.params.id)
    res.json(results);

  } catch(err) {
    res.send(err)
  }
})

module.exports = router;

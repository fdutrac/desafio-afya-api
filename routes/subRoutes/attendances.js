const express = require('express');
const router = express.Router();

const Controllers = require('../../controllers/index');


// CRUD e Selects 
router.get('/', async function(req, res) {
    try {
      const attendances = await Controllers.Attendance.getAll(req.body);
      res.json(attendances);
    }  catch(err){
      res.send(err);
    }
});

router.get('/:id', async function(req, res) {
  try {
    const attendance = await Controllers.Attendance.getOne(req.params.id);
    res.json(attendance);
  }  catch(err){
    res.send(err);
  }
});

router.put('/:id', async function(req, res) {
  try {
    const attendance = await Controllers.Attendance.update(req.params.id, req.body);
    res.json(attendance);
  } catch(err) {
    res.send(err);
  }
})

router.post('/', async function(req, res) {
  try {
    const attendance = await Controllers.Attendance.insert(req.body);
    res.json(attendance);
  }  catch(err){
    res.send(err);
  }
});

router.delete('/:id', async function(req, res) {
  try {
    const results = await Controllers.Attendance.remove(req.params.id)
    res.json(results);

  } catch(err) {
    res.send(err)
  }
})

module.exports = router;

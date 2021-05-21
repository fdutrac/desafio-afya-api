var express = require('express');
const createConnection = require('typeorm').createConnection;
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const connection = await createConnection()
    const repository = connection.getRepository('User');
    const allUsers = await repository.find();
    connection.close();
    res.send(JSON.stringify(allUsers));
  }  catch(err){
    res.send(err);
  }
});

router.post('/', async function(req, res, next) {

  const user = req.body;
  
  try {
    const connection = await createConnection()
    const repository = connection.getRepository('User');
    let savedUser = await repository.save(user);
    connection.close();
    res.send(JSON.stringify(savedUser));
  }  catch(err){
    res.send(err);
  }
});

module.exports = router;

const { createConnection } = require('typeorm');

module.exports = function () {
  createConnection().then(() => {
    console.log('Connected successfully');
  }).catch((err) => {
    console.log(err);
  });
};

const { createConnection } = require('typeorm');

module.exports = function startDatabase() {
  createConnection().then(() => {
    console.log('Conected successfully');
  }).catch((err) => {
    console.log(err);
  });
};

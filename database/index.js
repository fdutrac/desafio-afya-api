const { createConnection } = require('typeorm');

module.exports = function connectDB() {
  createConnection().then(() => {
    console.log('Conected successfully');
  }).catch((err) => {
    console.log(err);
  });
};

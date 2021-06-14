const { createConnection } = require('typeorm');

module.exports = async function startDB() {
  await createConnection().then(() => {
    console.log('Connected successfully');
  }).catch((err) => {
    console.log(err);
  });
};

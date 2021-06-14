const bcrypt = require('bcrypt');

module.exports = {
  encrypt(password) {
    return bcrypt.hashSync(password, 10);
  },
  compare(password, encryptedPass) {
    return bcrypt.compareSync(password, encryptedPass);
  },
};

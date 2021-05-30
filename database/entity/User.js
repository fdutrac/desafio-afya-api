const { EntitySchema } = require('typeorm');
// let baseModel = require("./BaseModel");

module.exports = new EntitySchema({
  name: 'User',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
      length: 255,
      nullable: false,
    },
    login: {
      type: String,
      length: 20,
      nullable: false,
      unique: true,
    },
    password: {
      type: String,
      nullable: false,
    },
    // ...baseModel,
  },
});

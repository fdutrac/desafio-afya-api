let EntitySchema = require("typeorm").EntitySchema;
// let baseModel = require("./BaseModel");

module.exports = new EntitySchema({
  name: "Client",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    register: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      length: 255,
      nullable: false,
    },
    phone: {
      type: String,
      length: 14,
      nullable: true,
    },
    cellphone: {
      type: String,
      length: 14,
      nullable: true,
    },
    mail: {
      type: String,
      lenght: 30,
      unique: true,
    },
    // ...baseModel,
  },
});

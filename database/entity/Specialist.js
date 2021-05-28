let EntitySchema = require("typeorm").EntitySchema;
// let baseModel = require("./BaseModel");

module.exports = new EntitySchema({
  name: "Specialist",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    register: {
      type: String,
      length: 100,
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
      nullable: false,
    },
    mail: {
      type: String,
      length: 50,
      unique: true,
    },
  },
  relations: {
    address: {
      type: "one-to-one",
      target: "Address",
      joinColumn: true,
      cascade: true,
      nullable: false
    },
    profession: {
      type: "many-to-one",
      target: "Profession",
      cascade: false
    }
  }
});

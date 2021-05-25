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
    name: {
      type: String,
      length: 255,
      nullable: false,
    },
    cpf: {
      type: String,
      length: 14,
      nullable: false,
      unique: true,
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
    relations: {
      categories: {
        type: "one-to-one",
        target: "Address"
      }
    }
    // ...baseModel,
  },
});

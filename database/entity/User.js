let EntitySchema = require("typeorm").EntitySchema;
let baseModel = require("./BaseModel");

module.exports = new EntitySchema({
  name: "User",
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
    username: {
      type: String,
      length: 20,
      nullable: false,
    },
    password: {
      type: String,
      nullable: false,
    },
    ...baseModel,
  },
});

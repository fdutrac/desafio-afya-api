const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Address',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    cep: {
      type: String,
      length: 255,
      nullable: false,
    },
    street: {
      type: String,
      length: 255,
      nullable: false,
    },
    // number: {
    //   type: String,
    //   length: 50,
    //   nullable: false,
    // },
    complement: {
      type: String,
      length: 255,
      nullable: true,
    },
    neighborhood: {
      type: String,
      length: 100,
      nullable: false,
    },
    locality: {
      type: String,
      length: 255,
      nullable: true,
    },
    state: {
      type: String,
      length: 100,
      nullable: false,
    },
  },
});

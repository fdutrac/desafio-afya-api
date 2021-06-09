const { EntitySchema } = require('typeorm');
const baseModel = require('./BaseModel');

module.exports = new EntitySchema({
  name: 'Specialist',
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
      nullable: true, // mudar para false
    },
    cellphone: {
      type: String,
      length: 14,
      nullable: true,
    },
    mail: {
      type: String,
      length: 50,
      // 255
      unique: true,
      nullable: false,
    },
    ...baseModel,
  },
  relations: {
    address: {
      type: 'one-to-one',
      target: 'Address',
      joinColumn: true,
      cascade: true,
      nullable: false,
    },
    profession: {
      type: 'many-to-one',
      target: 'Profession',
      cascade: false,
      nullable: false,
    },
  },
});

const { EntitySchema } = require('typeorm');
const baseModel = require('./BaseModel');

module.exports = new EntitySchema({
  name: 'Profession',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
      nullable: false,
    },
    ...baseModel,
  },
  relations: {
    specialists: {
      target: 'Specialist',
      type: 'one-to-many',
      nullable: true,
    },
  },
});

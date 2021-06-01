const { EntitySchema } = require('typeorm');

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
  },
  relations: {
    specialists: {
      target: 'Specialist',
      type: 'one-to-many',
      nullable: true,
    },
  },
});

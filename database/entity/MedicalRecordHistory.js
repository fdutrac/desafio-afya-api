const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Medical_Record_History',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    date: {
      type: 'date',
      nullable: false,
    },
    hour: {
      type: 'time',
      nullable: false,
    },
    description: {
      type: String,
      length: 255,
      nullable: false,
    },
  },
  relations: {
    medical_records: {
      type: 'many-to-one',
      target: 'Medical_Record',
      cascade: true,
    },
    specialist: {
      type: 'one-to-one',
      target: 'Specialist',
      joinColumn: true,
    },
  },

});

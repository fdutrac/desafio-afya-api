const { EntitySchema } = require('typeorm');
const BaseModel = require('./BaseModel');

module.exports = new EntitySchema({
  name: 'MedicalRecordHistory',
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
    ...BaseModel,
  },
  relations: {
    medicalRecords: {
      type: 'many-to-one',
      target: 'MedicalRecord',
      cascade: true,
    },
    specialist: {
      type: 'one-to-one',
      target: 'Specialist',
      joinColumn: true,
    },
  },

});

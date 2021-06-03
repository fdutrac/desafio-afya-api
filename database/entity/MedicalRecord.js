const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'MedicalRecord',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    openingDate: {
      type: Date,
      nullable: false,
    },
  },
  relations: {
    client: {
      type: 'one-to-one',
      target: 'Client',
      joinColumn: 'true',
      cascade: false,
    },
    medicalRecordHistories: {
      type: 'one-to-many',
      target: 'MedicalRecordHistory',
      cascade: true,
    },
  },
});

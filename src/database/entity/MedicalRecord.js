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
      name: 'created_at',
      type: 'time with time zone',
      createDate: true,
      nullable: false,
    },
  },
  relations: {
    client: {
      type: 'one-to-one',
      target: 'Client',
      joinColumn: true,
      onDelete: 'CASCADE',
      nullable: false,
    },
    medicalRecordHistories: {
      type: 'one-to-many',
      target: 'MedicalRecordHistory',
      cascade: true,
    },
  },
});

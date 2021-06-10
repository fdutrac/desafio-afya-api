const UserEntity = require('./src/database/entity/User');
const ClientEntity = require('./src/database/entity/Client');
const AddressEntity = require('./src/database/entity/Address');
const SpecialistEntity = require('./src/database/entity/Specialist');
const ProfessionEntity = require('./src/database/entity/Profession');
const MedicalRecordEntity = require('./src/database/entity/MedicalRecord');
const MedicalRecordHistoryEntity = require('./src/database/entity/MedicalRecordHistory');
const AttendanceEntity = require('./src/database/entity/Attendance');

module.exports = {
  type: 'postgres',
  // name: "clinica-medica",
  synchronize: true,
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  logging: false,
  logger: 'simple-console',
  database: 'clinica-medica',
  entities: [
    UserEntity,
    ClientEntity,
    AddressEntity,
    SpecialistEntity,
    ProfessionEntity,
    MedicalRecordEntity,
    MedicalRecordHistoryEntity,
    AttendanceEntity,
  ],
  migrations: ['./src/database/migration/*.js'],
  cli: {
    migrationsDir: './src/database/migration',
  },
};

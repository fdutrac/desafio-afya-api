const UserEntity = require('./database/entity/User');
const ClientEntity = require('./database/entity/Client');
const AddressEntity = require('./database/entity/Address');
const SpecialistEntity = require('./database/entity/Specialist');
const ProfessionEntity = require('./database/entity/Profession');
const MedicalRecordEntity = require('./database/entity/MedicalRecord');
const MedicalRecordHistoryEntity = require('./database/entity/MedicalRecordHistory');
const AttendanceEntity = require('./database/entity/Attendance');

module.exports = {
  type: 'postgres',
  // name: "clinica-medica",
  synchronize: true,
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  logging: true,
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
  migrations: ['./database/migration/*.js'],
  cli: {
    migrationsDir: './database/migration',
  },
};

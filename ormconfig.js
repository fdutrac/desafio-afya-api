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
  synchronize: false,
  url: 'postgres://netagqufxmjzey:8f643bf14fed9573f89a9cefb06be9e0895f1fcfe287fd55f890d4a5398aadc6@ec2-34-193-101-0.compute-1.amazonaws.com:5432/d5ctm79td0uh8o',
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  logging: false,
  logger: 'simple-console',
  database: process.env.DB_NAME,
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
  migrations: ['./src/database/migrations/*.js'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
};

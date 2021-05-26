module.exports = {
  type: "postgres",
  // name: "clinica-medica",
  synchronize: true,
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1234",
  logging: true,
  logger: "simple-console",
  database: "clinica-medica",
  entities: [
    require("./database/entity/User"),
    require("./database/entity/Client"),
    require("./database/entity/Address"),
    require("./database/entity/Specialist"),
    require("./database/entity/Profession"),
    require("./database/entity/MedicalRecord"),
  ],
  migrations: ["./database/migration/*.js"],
  cli: {
    migrationsDir: "./database/migration",
  },
};
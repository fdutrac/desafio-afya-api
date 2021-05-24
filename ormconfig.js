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
  //   require("./database/entity/Patient"),
  //   require("./database/entity/Physician"),
  ],
  migrations: ["./database/migration/*.js"],
  cli: {
    migrationsDir: "./database/migration",
  },
};
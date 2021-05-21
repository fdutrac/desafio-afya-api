module.exports = {
    type: "sqlite",
    // name: "db",
    synchronize: true,
    logging: true,
    logger: "simple-console",
    database: "database.sqlite",
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
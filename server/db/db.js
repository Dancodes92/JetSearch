const { Sequelize } = require("sequelize");
const pkg = require("../package.json");

const dbName = pkg.name + (process.env.NODE_ENV === "test" ? "-test" : "");

const config = {
  logging: false,
};

if (process.env.Logging === "true") {
  delete config.logging;
}

if (process.env.DB_URL) {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const db = new Sequelize(process.env.DB_URL || `postgres://localhost:5432/${dbName}`, config);

module.exports = db;
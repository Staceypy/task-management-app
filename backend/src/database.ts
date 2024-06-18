// import { Sequelize } from "sequelize";

// export const sequelize = new Sequelize("database", "username", "password", {
//   host: "localhost",
//   dialect: "mysql",
// });

// export const connectDB = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// };

// const mysql = require('mysql')

// const config = require('./config').db /

// module.exports = mysql.createConnection(config)

const mysql = require("mysql");

const config = require("./db_config").db;

module.exports = mysql.createConnection(config);

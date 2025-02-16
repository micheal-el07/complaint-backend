// import { Sequelize } from "sequelize";
// import "./env.config";

// export const sequelize = new Sequelize(
//   String(process.env.DB_NAME),
//   String(process.env.DB_DATABASE),
//   String(process.env.DB_PASSWORD),
//   {
//     host: "localhost",
//     dialect: "postgres",
//     logging: false,
//   }
// );
// // import dotenv from "dotenv";

// // dotenv.config();

// // export const sequelize = new Sequelize({
// //   database: process.env.DB_NAME,
// //   username: process.env.DB_DATABASE,
// //   password: process.env.DB_PASSWORD,
// //   host: process.env.DB_HOST,
// //   port: Number(process.env.DB_PORT),
// //   dialect: "postgres",
// // });

// export const dbConnection = async () => {
//   try {
//     await sequelize.authenticate();
//   } catch (error) {
//     process.exit(1);
//   }
// };

import { Sequelize } from "sequelize";
import "./env.config";

export const sequelize = new Sequelize(
  String(process.env.DB_NAME),
  String(process.env.DB_DATABASE),
  String(process.env.DB_PASSWORD),
  {
    host: "localhost",
    dialect: "postgres",
    logging: false,
  }
);

export const dbConnection = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    process.exit(1);
  }
};

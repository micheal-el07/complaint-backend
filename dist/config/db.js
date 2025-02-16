"use strict";
// import { Sequelize } from "sequelize";
// import "./env.config";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = exports.sequelize = void 0;
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
const sequelize_1 = require("sequelize");
require("./env.config");
exports.sequelize = new sequelize_1.Sequelize(String(process.env.DB_NAME), String(process.env.DB_DATABASE), String(process.env.DB_PASSWORD), {
    host: "db",
    dialect: "postgres",
    logging: false,
});
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.sequelize.authenticate();
    }
    catch (error) {
        process.exit(1);
    }
});
exports.dbConnection = dbConnection;

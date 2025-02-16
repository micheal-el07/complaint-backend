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
    console.error("Error in authentication sequelize.", error);
    process.exit(1);
  }
};

import { Sequelize } from "sequelize";
import "./env.config";

export const sequelize = new Sequelize(
  String(process.env.DB_NAME),
  String(process.env.DB_DATABASE),
  String(process.env.DB_PASSWORD),
  {
    host: String(process.env.DB_HOST) || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    dialect: "postgres",
    logging: false,
  }
);

export const dbConnection = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.log("Fail to connect to database, check sequelize authentication.");
    process.exit(1);
  }
};

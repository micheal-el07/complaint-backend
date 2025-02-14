import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { dbConnection } from "./config/db";
import "./config/env.config";

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 4000;

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
  });
};

const initApp = async () => {
  try {
    await dbConnection();
    console.log("Database connected successfully");
    startServer();
  } catch (error) {
    console.log("Failed to connect to database");
    process.exit(1);
  }
};

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

initApp();

export default app;

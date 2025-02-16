import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import ComplaintModel from "./models/complaint.model";
import { dbConnection } from "./config/db";
import swaggerDoc from "./config/swagger.config";
import routers from "./routers";
import errorHandler from "./middlewares/error.middleware";

export const app: Application = express();
const PORT: number = Number(process.env.PORT) || 4000;

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running: http://127.0.0.1:${PORT}`);
  });
};

async function syncDatabase() {
  try {
    await ComplaintModel.sync({ alter: true });
    console.log("Complaint table synced successfully.");
  } catch (error) {
    console.error("Failed to sync Complaint table", error);
  }
}

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

app.use("/api", routers);

app.use("/*", (req, res) => {res.status(404).json({message: "Invalid endpoint."})}) 

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(errorHandler);

initApp();
syncDatabase();

export default app;

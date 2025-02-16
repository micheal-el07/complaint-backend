"use strict";
// import express, { Application } from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import swaggerUi from "swagger-ui-express";
// import ComplaintModel from "./models/complaint.model";
// import complaintRouter from "./routers/complaint.route";
// import { dbConnection } from "./config/db";
// import swaggerDoc from "./config/swagger.config";
// import routers from "./routers";
// import errorHandler from "./middlewares/error.middleware";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// export const app: Application = express();
// const PORT: number = Number(process.env.PORT) || 4000;
// const startServer = () => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on : http://localhost:${PORT}`);
//   });
// };
// async function syncDatabase() {
//   try {
//     await ComplaintModel.sync({ alter: true });
//     console.log("Complaint table synced successfully.");
//   } catch (error) {
//     console.error("Failed to sync Complaint table", error);
//   }
// }
// const initApp = async () => {
//   try {
//     await dbConnection();
//     await syncDatabase();
//     console.log("Database connected successfully");
//     startServer();
//   } catch (error) {
//     console.log("Failed to connect to database");
//     process.exit(1);
//   }
// };
// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use("/api", routers);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
// app.use(errorHandler);
// initApp();
// export default app;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const complaint_model_1 = __importDefault(require("./models/complaint.model"));
const db_1 = require("./config/db");
const swagger_config_1 = __importDefault(require("./config/swagger.config"));
const routers_1 = __importDefault(require("./routers"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
exports.app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 4000;
const startServer = () => {
    exports.app.listen(PORT, () => {
        console.log(`Server is live on: http://localhost:${PORT}`);
    });
};
function syncDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield complaint_model_1.default.sync({ alter: true });
            console.log("Complaint table synced successfully.");
        }
        catch (error) {
            console.error("Failed to sync Complaint table", error);
        }
    });
}
const initApp = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.dbConnection)();
        console.log("Database connected successfully");
        startServer();
    }
    catch (error) {
        console.log("Failed to connect to database");
        process.exit(1);
    }
});
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(body_parser_1.default.urlencoded({ extended: true }));
exports.app.use("/api", routers_1.default);
exports.app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_config_1.default));
exports.app.use(error_middleware_1.default);
initApp();
syncDatabase();
exports.default = exports.app;

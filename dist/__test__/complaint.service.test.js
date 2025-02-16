"use strict";
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
const complaint_service_1 = require("../services/complaint.service");
const axios_1 = __importDefault(require("axios"));
// import Complaint from "../models/complaint.model";
const complaint_repository_1 = require("../repository/complaint.repository");
// import { describe } from "@jest/globals";
jest.mock("axios");
jest.mock("../repository/complaint.repository");
describe("createComplaint", () => {
    const mockComplaint = {
        title: "Internet not working",
        description: "The internet is down for 3 days",
    };
    // Resets mocks before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("should create a complaint with assigned category", () => __awaiter(void 0, void 0, void 0, function* () {
        axios_1.default.post.mockResolvedValue({
            data: { category: "technical" },
        });
        complaint_repository_1.createComplaintToDB.mockResolvedValue(Object.assign(Object.assign({}, mockComplaint), { id: "123", category: "technical", createdAt: "2025-02-15T05:30:47.384Z", updatedAt: "2025-02-15T05:30:47.384Z" }));
        const result = yield (0, complaint_service_1.createComplaint)(mockComplaint);
        expect(result).toEqual(Object.assign(Object.assign({}, mockComplaint), { id: "123", category: "technical", createdAt: "2025-02-15T05:30:47.384Z", updatedAt: "2025-02-15T05:30:47.384Z" }));
        expect(axios_1.default.post).toHaveBeenCalledWith("http://localhost:8000/classify/", {
            text: mockComplaint.description,
            labels: ["billing", "service", "technical"],
        });
        expect(complaint_repository_1.createComplaintToDB).toHaveBeenCalledWith(expect.objectContaining({ category: "technical" }));
    }));
    it("should throw an error if classification API fails", () => __awaiter(void 0, void 0, void 0, function* () {
        axios_1.default.post.mockRejectedValue(new Error("Service unavailable"));
        yield expect((0, complaint_service_1.createComplaint)(mockComplaint)).rejects.toThrow("Error occured in createComplaint service function.");
    }));
});

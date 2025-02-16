"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComplaintById =
  exports.updateComplaintById =
  exports.createComplaint =
  exports.getComplaintById =
  exports.getAllComplaints =
    void 0;
const complaint_repository_1 = require("../repository/complaint.repository");
const axios_1 = __importDefault(require("axios"));
const customError_1 = require("../utils/customError");
// Send request to another service to get the category of the description
function classifyText(text) {
  return __awaiter(this, void 0, void 0, function* () {
    var _a, _b;
    try {
      const response = yield axios_1.default.post(
        "http://192.168.1.104:8000/classify/",
        {
          text: text,
          labels: ["billing", "service", "technical"],
        }
      );
      return response.data;
    } catch (error) {
      if (axios_1.default.isAxiosError(error)) {
        throw new customError_1.ClassificationError(
          `Classification API Error: ${
            ((_b =
              (_a = error.response) === null || _a === void 0
                ? void 0
                : _a.data) === null || _b === void 0
              ? void 0
              : _b.message) || "Service unavailable"
          }`
        );
      }
      throw new customError_1.ClassificationError(
        "Unexpected error in classifyText function"
      );
    }
  });
}
// Fetching all of the complaints logic
const getAllComplaints = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const complaintsFromDb = yield (0,
      complaint_repository_1.getAllComplaintsFromDB)();
      // Convert raw Sequelize data to Zod-defined `Complaint` type
      const complaints = complaintsFromDb.map(
        ({ id, title, description, category, createdAt, updatedAt }) => ({
          id,
          title,
          description,
          category,
          createdAt,
          updatedAt,
        })
      );
      return complaints;
    } catch (error) {
      console.error("Error fetching all complaints:", error);
      throw new Error(
        error.message || "Error occured in getAllComplaints service function."
      );
    }
  });
exports.getAllComplaints = getAllComplaints;
// Fetching a complaint by ID logic
const getComplaintById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const complaintFromDb = yield (0,
      complaint_repository_1.getComplaintByIdFromDB)(id);
      if (!complaintFromDb) {
        // throw new Error("Failed to fetch complaint from database.");
        return null;
      }
      const complaint = {
        id: complaintFromDb.id,
        title: complaintFromDb.title,
        description: complaintFromDb.description,
        category: complaintFromDb.category,
        createdAt: complaintFromDb.createdAt,
        updatedAt: complaintFromDb.updatedAt,
      };
      return complaint;
    } catch (error) {
      console.error("Error creating complaint:", error);
      throw new Error(
        error.message || "Error occured in getComplaintById service function."
      );
    }
  });
exports.getComplaintById = getComplaintById;
const createComplaint = (data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const classification = yield classifyText(data.description);
      if (!classification || !classification.category) {
        throw new Error("Failed to classify complaint description");
      }
      const complaintData = Object.assign(Object.assign({}, data), {
        category: classification.category,
      });
      return yield (0,
      complaint_repository_1.createComplaintToDB)(complaintData);
    } catch (error) {
      console.error("Error creating complaint:", error);
      throw new Error(
        error.message || "Error occured in createComplaint service function."
      );
    }
  });
exports.createComplaint = createComplaint;
// Updating a complaint by ID logic
const updateComplaintById = (id, data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const existingComplaint = yield (0,
      complaint_repository_1.getComplaintByIdFromDB)(id);
      if (!existingComplaint) {
        throw new Error(`Complaint with ID ${id} not found`);
      }
      let updatedData = Object.assign({}, data);
      // If the description is updated, classify the new description
      if (data.description) {
        const classification = yield classifyText(data.description);
        if (!classification || !classification.category) {
          throw new Error("Failed to classify complaint description");
        }
        updatedData.category = classification.category;
      }
      const updatedComplaint = yield (0,
      complaint_repository_1.updateComplaintToDB)(id, updatedData);
      if (!updatedComplaint) {
        throw new Error(`Failed to update complaint with ID ${id}`);
      }
      return updatedComplaint;
    } catch (error) {
      console.error("Error updating complaint:", error);
      throw new Error(
        error.message ||
          "Error occured in updateComplaintById service function."
      );
    }
  });
exports.updateComplaintById = updateComplaintById;
// Deleting a complaint by ID logic
const deleteComplaintById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const existingComplaint = yield (0,
      complaint_repository_1.getComplaintByIdFromDB)(id);
      if (!existingComplaint) {
        throw new Error(`Complaint with ID ${id} not found`);
      }
      return yield (0, complaint_repository_1.deleteComplaintFromDB)(id);
    } catch (error) {
      console.error("Error deleting complaint:", error);
      throw new Error(
        error.message ||
          "Error occured in deleteComplaintById service function."
      );
    }
  });
exports.deleteComplaintById = deleteComplaintById;

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComplaintController = exports.updateComplaintController = exports.createComplaintController = exports.getComplaintByIdController = exports.getAllComplaintsController = void 0;
const complaint_service_1 = require("../services/complaint.service");
const complaintValidator_1 = require("../validation/complaintValidator");
// Get all complaints
const getAllComplaintsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const complaints = yield (0, complaint_service_1.getAllComplaints)();
        if (!complaints) {
            res.status(400).json({
                success: false,
                message: "Error occured while fetching all complaints.",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Complaints fetched successfully",
            data: complaints,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured in getAllComplaintsController.",
            error: error.message,
        });
    }
});
exports.getAllComplaintsController = getAllComplaintsController;
const getComplaintByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const complaint = yield (0, complaint_service_1.getComplaintById)(id);
        if (complaint == null) {
            res
                .status(404)
                .json({ success: false, message: `No complaint with ID ${id} found.` });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Complaint fetched successfully",
            data: complaint,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured in getComplaintByIdController.",
            error: error.message,
        });
    }
});
exports.getComplaintByIdController = getComplaintByIdController;
// Create a new complaint
const createComplaintController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = complaintValidator_1.createComplaintSchema.parse(req.body);
        const newComplaint = yield (0, complaint_service_1.createComplaint)(validatedData);
        if (!newComplaint) {
            res.status(400).json({
                success: false,
                message: "Error occured while creating complaint.",
            });
            return;
        }
        res.status(201).json(newComplaint);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured in createComplaintsController.",
            error: error.message,
        });
    }
});
exports.createComplaintController = createComplaintController;
const updateComplaintController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = complaintValidator_1.updateComplaintSchema.parse(req.body);
        const { id } = req.params;
        const updatedComplaint = yield (0, complaint_service_1.updateComplaintById)(id, validatedData);
        res.status(200).json({
            success: true,
            message: "Complaint updated successfully.",
            data: updatedComplaint,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured in updateComplaintController.",
            error: error.message,
        });
    }
});
exports.updateComplaintController = updateComplaintController;
// Delete a complaint
const deleteComplaintController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const existingComplaint = yield (0, complaint_service_1.getComplaintById)(id);
        if (!existingComplaint) {
            res.status(404).json({ successs: false, message: "Complaint not found" });
            return;
        }
        yield (0, complaint_service_1.deleteComplaintById)(id);
        res.status(204).json({ message: "Complaint deleted successfully" });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured in deleteComplaintsController.",
            error: error.message,
        });
    }
});
exports.deleteComplaintController = deleteComplaintController;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateComplaintSchema = exports.createComplaintSchema = exports.complaintSchema = void 0;
const zod_1 = require("zod");
exports.complaintSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    title: zod_1.z
        .string()
        .min(1, "Title is required")
        .max(50, "Title should be less than 50 words"),
    description: zod_1.z.string().min(1, "Description is required"),
    category: zod_1.z.enum(["billing", "service", "technical"]),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date().optional(),
});
exports.createComplaintSchema = exports.complaintSchema.omit({
    id: true,
    category: true,
    createdAt: true,
    updatedAt: true,
});
exports.updateComplaintSchema = exports.complaintSchema.partial();

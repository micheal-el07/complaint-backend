import { z } from "zod";

export const complaintSchema = z.object({
  id: z.string().uuid(),
  title: z
    .string()
    .min(4, "Title is required")
    .max(50, "Title should be less than 50 words"),
  description: z.string().min(1, "Description is required"),
  category: z.enum(["billing", "service", "technical"]),
});

export const createComplaintSchema = complaintSchema.omit({
  id: true,
  category: true,
});
export const updateComplaintSchema = complaintSchema.partial();

export type Complaint = z.infer<typeof complaintSchema>;
export type CreateComplaint = z.infer<typeof createComplaintSchema>;
export type UpdateComplaint = z.infer<typeof updateComplaintSchema>;

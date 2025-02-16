// import { classifyText, createComplaint,  } from "../services/complaint.service";
// import axios from "axios";
// // import Complaint from "../models/complaint.model";
// import { createComplaintToDB } from "../repository/complaint.repository";
// import { CreateComplaint } from "../validation/complaintValidator";
// // import { describe } from "@jest/globals";

// jest.mock("axios");
// jest.mock("../repository/complaint.repository");

// describe("createComplaint", () => {
//   const mockComplaint: CreateComplaint = {
//     title: "Internet not working",
//     description: "The internet is down for 3 days",
//   };

//   const mockClassify = {
//     text: "My internet is not working",
//     labels: ["billing", "service", "technical"],
//   }

//   // Resets mocks before each test
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("should create a complaint with assigned category", async () => {
//     (axios.post as jest.Mock).mockResolvedValue({
//       data: { category: "technical" },
//     });
//     (createComplaintToDB as jest.Mock).mockResolvedValue({
//       ...mockComplaint,
//       id: "123",
//       category: "technical",
//       createdAt: "2025-02-15T05:30:47.384Z",
//       updatedAt: "2025-02-15T05:30:47.384Z",
//     });

//     const result = await createComplaint(mockComplaint);

//     expect(result).toEqual({
//       ...mockComplaint,
//       id: "123",
//       category: "technical",
//       createdAt: "2025-02-15T05:30:47.384Z",
//       updatedAt: "2025-02-15T05:30:47.384Z",
//     });

//     expect(axios.post).toHaveBeenCalledWith("http://localhost:8000/classify/", {
//       text: mockComplaint.description,
//       labels: ["billing", "service", "technical"],
//     });

//     expect(createComplaintToDB).toHaveBeenCalledWith(
//       expect.objectContaining({ category: "technical" })
//     );
//   });

//   // it("should throw an error if classification API fails", async () => {
//   //   (axios.post as jest.Mock).mockRejectedValue(
//   //     new Error("Service unavailable")
//   //   );

//   //   await expect(classifyText(mockClassify.text)).rejects.toThrow(
//   //     "Failed to classify complaint description"
//   //   );
//   // });
// });

// // describe("classifyDescription", () => {
// //   const mockComplaint: CreateComplaint = {
// //     title: "Internet not working",
// //     description: "The internet is down for 3 days",
// //   };

// //   // Resets mocks before each test
// //   beforeEach(() => {
// //     jest.clearAllMocks();
// //   });

// //   it("should throw Classification Error if not Axios Error", async () => {
// //     await expect(classifyDescription(mockComplaint)).rejects.toThrow(
// //       "Failed to classify complaint description"
// //     );
// //   })
// // })

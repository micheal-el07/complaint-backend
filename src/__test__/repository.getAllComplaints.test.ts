import { getAllComplaintsFromDB } from "../repository/complaint.repository";
import { ComplaintModel } from "../models/complaint.model";

jest.mock("../models/complaint.model");

describe("getAllComplaintsFromDB", () => {
  const mockComplaints = [
    {
      id: "123",
      title: "Network Issue",
      description: "Internet is down",
      category: "technical",
      createdAt: "2025-02-15T05:30:47.384Z",
      updatedAt: "2025-02-15T05:30:47.384Z",
    },
    {
      id: "124",
      title: "Billing Error",
      description: "Charged incorrectly",
      category: "billing",
      createdAt: "2025-02-15T05:30:47.384Z",
      updatedAt: "2025-02-15T05:30:47.384Z",
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all complaints when found", async () => {
    (ComplaintModel.findAll as jest.Mock).mockResolvedValue(mockComplaints);

    const result = await getAllComplaintsFromDB();

    expect(result).toEqual(mockComplaints);
    expect(ComplaintModel.findAll).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if findAll fails", async () => {
    (ComplaintModel.findAll as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );

    await expect(getAllComplaintsFromDB()).rejects.toThrow("Database error");
    expect(ComplaintModel.findAll).toHaveBeenCalledTimes(1);
  });
});

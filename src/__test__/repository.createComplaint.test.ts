import { createComplaintToDB } from "../repository/complaint.repository";
import { ComplaintModel } from "../models/complaint.model";
import {
  ComplaintAttributes,
  ComplaintCreationAttributes,
} from "../models/complaint.model";

jest.mock("../models/complaint.model");

describe("createComplaintToDB", () => {
  const mockComplaintData: ComplaintCreationAttributes = {
    title: "Internet Issue",
    description: "Internet is down",
    category: "technical",
  };

  const mockCreatedComplaint: ComplaintAttributes = {
    id: "123",
    ...mockComplaintData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create and return a new complaint", async () => {
    (ComplaintModel.create as jest.Mock).mockResolvedValue(
      mockCreatedComplaint
    );

    await expect(createComplaintToDB(mockComplaintData)).resolves.toEqual(
      mockCreatedComplaint
    );
    expect(ComplaintModel.create).toHaveBeenCalledWith(mockComplaintData);
  });

  it("should throw an error if creation fails", async () => {
    (ComplaintModel.create as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );

    await expect(createComplaintToDB(mockComplaintData)).rejects.toThrow(
      "Database error"
    );
    expect(ComplaintModel.create).toHaveBeenCalledWith(mockComplaintData);
  });
});

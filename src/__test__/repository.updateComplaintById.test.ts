import { updateComplaintToDB } from "../repository/complaint.repository";
import { ComplaintModel } from "../models/complaint.model";
import { ComplaintAttributes } from "../models/complaint.model";

jest.mock("../models/complaint.model");

describe("updateComplaintToDB", () => {
  const complaintId = "123";
  const updatedData: Partial<ComplaintAttributes> = { title: "Updated Title" };
  const mockComplaint: ComplaintAttributes = {
    id: complaintId,
    title: "Updated Title",
    description: "Internet is down",
    category: "technical",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update and return the updated complaint", async () => {
    (ComplaintModel.update as jest.Mock).mockResolvedValue([1]);
    (ComplaintModel.findByPk as jest.Mock).mockResolvedValue(mockComplaint);

    await expect(
      updateComplaintToDB(complaintId, updatedData)
    ).resolves.toEqual(mockComplaint);
    expect(ComplaintModel.update).toHaveBeenCalledWith(updatedData, {
      where: { id: complaintId },
    });
    expect(ComplaintModel.findByPk).toHaveBeenCalledWith(complaintId);
  });

  it("should return null if the complaint does not exist", async () => {
    (ComplaintModel.update as jest.Mock).mockResolvedValue([0]);
    (ComplaintModel.findByPk as jest.Mock).mockResolvedValue(null);

    await expect(
      updateComplaintToDB(complaintId, updatedData)
    ).resolves.toBeNull();
    expect(ComplaintModel.update).toHaveBeenCalledWith(updatedData, {
      where: { id: complaintId },
    });
    expect(ComplaintModel.findByPk).toHaveBeenCalledWith(complaintId);
  });

  it("should throw an error if the update fails", async () => {
    (ComplaintModel.update as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );

    await expect(updateComplaintToDB(complaintId, updatedData)).rejects.toThrow(
      "Database error"
    );
    expect(ComplaintModel.update).toHaveBeenCalledWith(updatedData, {
      where: { id: complaintId },
    });
  });
});

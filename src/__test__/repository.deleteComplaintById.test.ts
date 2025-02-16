import { deleteComplaintFromDB } from "../repository/complaint.repository";
import { ComplaintModel } from "../models/complaint.model";

jest.mock("../models/complaint.model");

describe("deleteComplaintFromDB", () => {
  const complaintId = "123";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete a complaint successfully", async () => {
    (ComplaintModel.destroy as jest.Mock).mockResolvedValue(1);

    await expect(deleteComplaintFromDB(complaintId)).resolves.toBeUndefined();
    expect(ComplaintModel.destroy).toHaveBeenCalledWith({
      where: { id: complaintId },
    });
    expect(ComplaintModel.destroy).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if deletion fails", async () => {
    (ComplaintModel.destroy as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );

    await expect(deleteComplaintFromDB(complaintId)).rejects.toThrow(
      "Database error"
    );
    expect(ComplaintModel.destroy).toHaveBeenCalledWith({
      where: { id: complaintId },
    });
    expect(ComplaintModel.destroy).toHaveBeenCalledTimes(1);
  });
});

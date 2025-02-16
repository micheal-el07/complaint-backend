import { getComplaintByIdFromDB } from "../repository/complaint.repository";
import { ComplaintModel } from "../models/complaint.model";

jest.mock("../models/complaint.model");

describe("getComplaintByIdFromDB", () => {
  const mockComplaint = {
    id: "123",
    title: "Network Issue",
    description: "Internet is down",
    category: "technical",
    createdAt: "2025-02-15T05:30:47.384Z",
    updatedAt: "2025-02-15T05:30:47.384Z",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a complaint when found", async () => {
    (ComplaintModel.findByPk as jest.Mock).mockResolvedValue(mockComplaint);

    const result = await getComplaintByIdFromDB("123");

    expect(result).toEqual(mockComplaint);
    expect(ComplaintModel.findByPk).toHaveBeenCalledWith("123");
    expect(ComplaintModel.findByPk).toHaveBeenCalledTimes(1);
  });

  it("should return null when complaint is not found", async () => {
    (ComplaintModel.findByPk as jest.Mock).mockResolvedValue(null);

    const result = await getComplaintByIdFromDB("999");

    expect(result).toBeNull();
    expect(ComplaintModel.findByPk).toHaveBeenCalledWith("999");
    expect(ComplaintModel.findByPk).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if findByPk fails", async () => {
    (ComplaintModel.findByPk as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );

    await expect(getComplaintByIdFromDB("123")).rejects.toThrow("Database error");
    expect(ComplaintModel.findByPk).toHaveBeenCalledWith("123");
    expect(ComplaintModel.findByPk).toHaveBeenCalledTimes(1);
  });
});

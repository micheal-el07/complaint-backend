import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import { ComplaintModel } from "../types/db";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateComplaintsDto:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          default: Stuck at loading page
 *        description:
 *          type: text
 *          default: My applicaiton would not load to anywhere and stuck at the home page
 *      required:
 *        - title
 *        - description
 * 
 *    UpdateComplaintDto:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          default: Stuck at loading page
 *        description:
 *          type: text
 *          default: My applicaiton would not load to anywhere and stuck at the home page
 *      required:
 * 
 *    ComplaintDto:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        title:
 *          type: string
 *        description:
 *          type: string
 *        category:
 *          type: enum("billing", "service", "technical")
 *        createdAt:
 *          type: string
 *          format: date
 *        updatedAt:
 *          type: string
 *          format: date
 */

// Initialize model
ComplaintModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM("billing", "service", "technical"),
      allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "complaints",
    timestamps: true,
  }
);

export default ComplaintModel;

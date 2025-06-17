import mongoose from "mongoose";
import dotenv from "dotenv";
import RoleModel from "../models/role.model";
import PermissionModel from "../models/permission.model";
import { ROLE } from "../enums/role.enum";
import { PERMISSION } from "../enums/permission.enum";
import { getEnv } from "../utils/get-env";

dotenv.config();

const MONGODB_URI = getEnv("MONGODB_URI", process.env.MONGODB_URI);

const permissions = Object.values(PERMISSION).map((name) => ({ name }));

const roles = [
  {
    name: ROLE.ADMIN,
    permissions: [
      PERMISSION.MANAGE_USERS,
      PERMISSION.CREATE_PROPERTY,
      PERMISSION.READ_PROPERTY,
      PERMISSION.UPDATE_PROPERTY,
      PERMISSION.DELETE_PROPERTY,
      PERMISSION.CREATE_APPOINTMENT,
      PERMISSION.APPROVE_APPOINTMENT,
      PERMISSION.VIEW_DASHBOARD,
    ],
  },
  {
    name: ROLE.AGENT,
    permissions: [
      PERMISSION.CREATE_PROPERTY,
      PERMISSION.READ_PROPERTY,
      PERMISSION.UPDATE_PROPERTY,
      PERMISSION.DELETE_PROPERTY,
      PERMISSION.CREATE_APPOINTMENT,
      PERMISSION.VIEW_DASHBOARD,
    ],
  },
  {
    name: ROLE.USER,
    permissions: [PERMISSION.READ_PROPERTY, PERMISSION.CREATE_APPOINTMENT],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(MONGODB_URI!);
    console.log("Database connected for seeding.");

    // Clear existing data
    await PermissionModel.deleteMany({});
    await RoleModel.deleteMany({});
    console.log("Cleared existing roles and permissions.");

    // Insert permissions
    const insertedPermissions = await PermissionModel.insertMany(permissions);
    console.log("Permissions seeded.");

    const permissionMap = new Map(
      insertedPermissions.map((p) => [p.name, p._id])
    );

    // Prepare and insert roles
    const rolesToInsert = roles.map((role) => ({
      ...role,
      permissions: role.permissions.map((pName) => permissionMap.get(pName)),
    }));

    await RoleModel.insertMany(rolesToInsert);
    console.log("Roles seeded with permissions.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Database disconnected.");
  }
};

seed();

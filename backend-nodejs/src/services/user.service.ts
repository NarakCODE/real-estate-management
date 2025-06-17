import { Types } from "mongoose";
import UserModel, { IUser } from "../models/user.model";
import { BadRequestException, NotFoundException } from "../utils/appError";
import RoleModel from "../models/role.model";

export const getUsersService = async () => {
  try {
    const users = await UserModel.find({})
      .populate("roleId", "name")
      .select("-password");
    return users;
  } catch (error) {
    throw new BadRequestException("Failed to get users");
  }
};

export const deleteUserService = async (userId: string) => {
  try {
    const user = await UserModel.findByIdAndDelete(userId);
    return user;
  } catch (error) {
    throw new BadRequestException("Failed to delete user");
  }
};

export const assignRoleToUserService = async (
  userId: string,
  roleId: string
): Promise<Omit<IUser, "password">> => {
  if (!Types.ObjectId.isValid(userId)) {
    throw new BadRequestException("Invalid User ID format");
  }
  if (!Types.ObjectId.isValid(roleId)) {
    throw new BadRequestException("Invalid Role ID format");
  }

  const user = await UserModel.findById(userId);
  if (!user) {
    throw new NotFoundException("User not found");
  }

  const role = await RoleModel.findById(roleId);
  if (!role) {
    throw new NotFoundException("Role not found");
  }

  user.roleId = role._id;
  await user.save();

  return user.omitPassword();
};

import { Types } from "mongoose";
import UserModel, { IUser } from "../models/user.model";
import { BadRequestException, NotFoundException } from "../utils/appError";
import RoleModel from "../models/role.model";
import { ROLE } from "../enums/role.enum";
import PropertyModel from "../models/property.model";
import Appointment from "../models/appointment.model";
import { PROPERTY_AVAILABILITY, PROPERTY_STATUS } from "../enums/property.enum";
import InquiryModel from "../models/inquiry.model";
import { INQUIRY_STATUS } from "../enums/inquiry.enum";

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

export const getSummaryUserService = async () => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const [
            totalUsers,
            agentRole,
            totalProperties,
            upComingAppointments,
            soldOrRentedProperties,
            newInquiries,
        ] = await Promise.all([
            UserModel.countDocuments(),
            RoleModel.findOne({ name: ROLE.AGENT }),
            PropertyModel.countDocuments(),
            Appointment.countDocuments({ date: { $gte: today } }),
            PropertyModel.countDocuments([
                {
                    status: {
                        $in: [
                            PROPERTY_AVAILABILITY[2],
                            PROPERTY_AVAILABILITY[3],
                        ],
                    },
                },
            ]),
            InquiryModel.countDocuments({ status: INQUIRY_STATUS[0] }),
        ]);

        if (!agentRole) {
            throw new NotFoundException(
                "Agent role not found. Please ensure the database is initialized."
            );
        }

        const totalAgents = await UserModel.countDocuments({
            roleId: agentRole,
        });

        return {
            totalUsers,
            totalAgents,
            totalProperties,
            upComingAppointments,
            soldOrRentedProperties,
            newInquiries,
        };
    } catch (error) {
        if (error instanceof NotFoundException) {
            throw error;
        }
        throw new BadRequestException("Failed to get user summary");
    }
};

import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http-status.config";
import {
    assignRoleToUserService,
    deleteUserService,
    getSummaryUserService,
    getUsersService,
} from "../services/user.service";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { BadRequestException, NotFoundException } from "../utils/appError";

export const getUsersController = asyncHandler(
    async (req: Request, res: Response) => {
        const users = await getUsersService();

        if (!users) {
            return res.status(HTTPSTATUS.OK).json({
                message: "No users",
            });
        }

        res.status(HTTPSTATUS.OK).json({
            message: "Users retrieved successfully",
            data: users,
        });
    }
);

export const deleteUserController = asyncHandler(
    async (req: Request, res: Response) => {
        const { userId } = req.params;
        if (!userId) {
            return res.status(HTTPSTATUS.BAD_REQUEST).json({
                message: "User ID is required",
            });
        }

        const user = await deleteUserService(userId);

        if (!user) {
            return new NotFoundException("User not found");
        }

        res.status(HTTPSTATUS.OK).json({
            message: "User deleted successfully",
        });
    }
);

export const assignRoleController = asyncHandler(
    async (req: Request, res: Response) => {
        const { userId } = req.params;
        const { roleId } = req.body;

        if (!userId) {
            throw new BadRequestException("User ID is required");
        }
        if (!roleId) {
            throw new BadRequestException("Role ID is required");
        }

        const updatedUser = await assignRoleToUserService(userId, roleId);

        res.status(HTTPSTATUS.OK).json({
            message: "User role assigned successfully",
            data: updatedUser,
        });
    }
);

export const getSummaryUserController = asyncHandler(
    async (req: Request, res: Response) => {
        const users = await getSummaryUserService();

        if (!users) {
            return res.status(HTTPSTATUS.OK).json({
                message: "No users",
            });
        }

        return res.status(HTTPSTATUS.OK).json({
            message: "Total users retrieved successfully",
            data: users,
        });
    }
);

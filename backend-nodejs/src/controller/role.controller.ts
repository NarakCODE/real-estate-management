import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http-status.config";
import { getRoleByIdService, getRolesService } from "../services/role.service";
import { NotFoundException } from "../utils/appError";

export const getRolesController = asyncHandler(
  async (req: Request, res: Response) => {
    const roles = await getRolesService();

    if (roles.length === 0) {
      return res.status(HTTPSTATUS.OK).json({
        message: "No roles",
      });
    }

    res.status(HTTPSTATUS.OK).json({
      message: "Roles retrieved successfully",
      data: roles,
    });
  }
);

export const getRoleByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(HTTPSTATUS.BAD_REQUEST).json({
        message: "Role ID is required",
      });
    }

    const role = await getRoleByIdService(id);

    if (!role) {
      return new NotFoundException("Role not found");
    }

    res.status(HTTPSTATUS.OK).json({
      message: "Role retrieved successfully",
      data: role,
    });
  }
);

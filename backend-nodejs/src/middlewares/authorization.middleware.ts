import { type Request, type Response, type NextFunction } from "express";
import { UnauthorizedException } from "../utils/appError";
import RoleModel from "../models/role.model";
import { RolePermissions } from "../utils/role-permission";
import { RoleType } from "../enums/role.enum";

export const authorize = (requiredPermission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sessionUser = (req.session as any).user;
      if (!sessionUser || !sessionUser.roleId) {
        return next(
          new UnauthorizedException("Not authenticated or role not assigned")
        );
      }

      const role = await RoleModel.findById(sessionUser.roleId);

      if (!role) {
        return next(new UnauthorizedException("Role not found."));
      }

      const roleName = role.name as RoleType;
      const permissions = RolePermissions[roleName] || [];

      if (!permissions.includes(requiredPermission as any)) {
        return next(new UnauthorizedException("Insufficient permissions."));
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

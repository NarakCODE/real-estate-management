// import { Request, Response, NextFunction } from "express";
// import { RoleType } from "../enums/role.enum";
// import { RolePermissions } from "../utils/role-permission";
// import { PermissionType } from "../enums/permission.enum";
// import { HTTPSTATUS } from "../config/http-status.config";

// /**
//  * Middleware to check if the user has one of the allowed roles and (optionally) required permissions.
//  * @param allowedRoles Array of allowed roles.
//  * @param requiredPermissions Optional array of required permissions.
//  */
// export function roleGuard(
//     allowedRoles: RoleType[],
//     requiredPermissions?: PermissionType[]
// ) {
//     return (req: Request, res: Response, next: NextFunction) => {
//         const userRole = req.user?.roleId as RoleType | undefined;

//         if (!userRole) {
//             return res
//                 .status(HTTPSTATUS.UNAUTHORIZED)
//                 .json({ message: "User role not found." });
//         }

//         if (!allowedRoles.includes(userRole)) {
//             return res
//                 .status(HTTPSTATUS.FORBIDDEN)
//                 .json({ message: "Forbidden: role not allowed." });
//         }

//         if (requiredPermissions && requiredPermissions.length > 0) {
//             const userPermissions = RolePermissions[userRole] || [];
//             const hasAllPermissions = requiredPermissions.every((p) =>
//                 userPermissions.includes(p)
//             );
//             if (!hasAllPermissions) {
//                 return res
//                     .status(HTTPSTATUS.FORBIDDEN)
//                     .json({ message: "Forbidden: insufficient permissions." });
//             }
//         }

//         next();
//     };
// }

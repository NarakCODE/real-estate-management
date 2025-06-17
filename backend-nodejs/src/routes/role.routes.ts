import { Router } from "express";
import {
  getRoleByIdController,
  getRolesController,
} from "../controller/role.controller";
import isAuthenticated from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorization.middleware";
import { PERMISSION } from "../enums/permission.enum";
import { assignRoleController } from "../controller/user.controller";

const roleRoutes = Router();

roleRoutes.get(
  "/",
  isAuthenticated,
  authorize(PERMISSION.MANAGE_USERS),
  getRolesController
);
roleRoutes.get(
  "/:id",
  isAuthenticated,
  authorize(PERMISSION.MANAGE_USERS),
  getRoleByIdController
);
roleRoutes.put(
  "/assign-role/:userId",
  isAuthenticated,
  authorize(PERMISSION.MANAGE_USERS),
  assignRoleController
);

export default roleRoutes;

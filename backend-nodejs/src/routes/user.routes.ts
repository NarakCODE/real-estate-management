import { Router } from "express";
import isAuthenticated from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorization.middleware";
import { PERMISSION } from "../enums/permission.enum";
import {
  assignRoleController,
  deleteUserController,
  getUsersController,
} from "../controller/user.controller";

const userRoutes = Router();

userRoutes.get(
  "/",
  isAuthenticated,
  authorize(PERMISSION.MANAGE_USERS),
  getUsersController
);
userRoutes.delete(
  "/:userId",
  isAuthenticated,
  authorize(PERMISSION.MANAGE_USERS),
  deleteUserController
);
userRoutes.put(
  "/:userId/assign-role",
  isAuthenticated,
  authorize(PERMISSION.MANAGE_USERS),
  assignRoleController
);

export default userRoutes;

import { Router } from "express";
import isAuthenticated from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorization.middleware";
import { PERMISSION } from "../enums/permission.enum";
import {
  createDealController,
  getDealByIdController,
  getDealsController,
} from "../controller/deal.controller";
import { createDealSchema, validateDeal } from "../validations/deal.validation";

const dealRoutes = Router();

dealRoutes.post(
  "/create",
  isAuthenticated,
  authorize(PERMISSION.CREATE_DEAL),
  validateDeal(createDealSchema),
  createDealController
);

dealRoutes.get(
  "/",
  isAuthenticated,
  authorize(PERMISSION.READ_DEAL),
  getDealsController
);

dealRoutes.get(
  "/:id",
  isAuthenticated,
  authorize(PERMISSION.READ_DEAL),
  getDealByIdController
);

export default dealRoutes;

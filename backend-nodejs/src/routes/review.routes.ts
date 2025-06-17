import { Router } from "express";
import isAuthenticated from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorization.middleware";
import { PERMISSION } from "../enums/permission.enum";
import {
  createReviewController,
  deleteReviewController,
  getReviewsController,
  updateReviewController,
} from "../controller/review.controller";
import {
  createReviewSchema,
  updateReviewSchema,
  validate,
} from "../validations/review.validation";

const reviewRoutes = Router();

reviewRoutes.get("/", getReviewsController);

reviewRoutes.post(
  "/create",
  isAuthenticated,
  authorize(PERMISSION.CREATE_REVIEW),
  validate(createReviewSchema),
  createReviewController
);

reviewRoutes.put(
  "/:id/update",
  isAuthenticated,
  authorize(PERMISSION.UPDATE_REVIEW),
  validate(updateReviewSchema),
  updateReviewController
);

reviewRoutes.delete(
  "/:id/delete",
  isAuthenticated,
  authorize(PERMISSION.DELETE_REVIEW),
  deleteReviewController
);

export default reviewRoutes;

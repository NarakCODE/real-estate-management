import { Router } from "express";
import {
  createInquiryController,
  deleteInquiryController,
  getInquiriesController,
  getInquiryByIdController,
} from "../controller/inquiry.controller";
import isAuthenticated from "../middlewares/auth.middleware";
import { createInquiryValidation } from "../validations/inquiry.validation";

const inquiryRoutes = Router();

inquiryRoutes.post(
  "/create",
  isAuthenticated,
  createInquiryValidation,
  createInquiryController
);
inquiryRoutes.get("/", isAuthenticated, getInquiriesController);
inquiryRoutes.delete(
  "/:inquiryId/delete",
  isAuthenticated,
  deleteInquiryController
);
inquiryRoutes.get("/:inquiryId", isAuthenticated, getInquiryByIdController);

export default inquiryRoutes;

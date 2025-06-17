import { Router } from "express";
import {
  createAppointmentController,
  getAppointmentsController,
  updateAppointmentController,
  deleteAppointmentController,
  getAppointmentByIdController,
  updateAppointmentStatusController,
} from "../controller/appointment.controller";
import isAuthenticated from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorization.middleware";
import { PERMISSION } from "../enums/permission.enum";
import {
  updateAppointmentValidation,
  updateAppointmentStatusValidation,
} from "../validations/appointment.validation";

const appointmentRoutes = Router();

appointmentRoutes.get("/", isAuthenticated, getAppointmentsController);
appointmentRoutes.post(
  "/create",
  isAuthenticated,
  authorize(PERMISSION.CREATE_APPOINTMENT),
  createAppointmentController
);

appointmentRoutes.put(
  "/:id/update",
  isAuthenticated,
  authorize(PERMISSION.UPDATE_APPOINTMENT),
  updateAppointmentValidation,
  updateAppointmentController
);

appointmentRoutes.patch(
  "/:id/status",
  isAuthenticated,
  authorize(PERMISSION.APPROVE_APPOINTMENT),
  updateAppointmentStatusValidation,
  updateAppointmentStatusController
);

appointmentRoutes.delete(
  "/:id/delete",
  isAuthenticated,
  authorize(PERMISSION.DELETE_APPOINTMENT),
  deleteAppointmentController
);

appointmentRoutes.get(
  "/:id",
  isAuthenticated,
  authorize(PERMISSION.READ_PROPERTY),
  getAppointmentByIdController
);

export default appointmentRoutes;

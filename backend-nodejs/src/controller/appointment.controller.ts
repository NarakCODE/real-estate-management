import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http-status.config";
import {
  CreateAppointmentInput,
  UpdateAppointmentInput,
  UpdateAppointmentStatusInput,
} from "../validations/appointment.validation";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  createAppointmentService,
  deleteAppointmentService,
  getAppointmentByIdService,
  getAppointmentsService,
  updateAppointmentService,
  updateAppointmentStatusService,
} from "../services/appointment.service";
import { Types } from "mongoose";
import { UnauthorizedException } from "../utils/appError";

// This assumes you have a user object on the request after authentication

export const createAppointmentController = asyncHandler(
  async (req: Request, res: Response) => {
    const sessionUser = (req.session as any)?.user;

    if (!sessionUser) {
      return res
        .status(HTTPSTATUS.UNAUTHORIZED)
        .json({ message: "Not authorized" });
    }
    const appointmentData = req.body as CreateAppointmentInput;
    const userId = sessionUser._id; // Get userId from session
    const appointment = await createAppointmentService(appointmentData, userId);
    res.status(HTTPSTATUS.CREATED).json({
      message: "Appointment created successfully.",
      data: appointment,
    });
  }
);

export const getAppointmentsController = asyncHandler(
  async (req: Request, res: Response) => {
    const appointments = await getAppointmentsService();
    res.json({
      message: "Appointments retrieved successfully.",
      data: appointments,
    });
  }
);

export const updateAppointmentController = asyncHandler(
  async (req: Request, res: Response) => {
    const sessionUser = (req.session as any)?.user;
    if (!sessionUser) {
      throw new UnauthorizedException("Not authorized");
    }

    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return res
        .status(HTTPSTATUS.BAD_REQUEST)
        .json({ message: "Invalid appointment ID format" });
    }
    const appointmentId = new Types.ObjectId(id);
    const updateData = req.body as UpdateAppointmentInput;

    const updatedAppointment = await updateAppointmentService(
      appointmentId,
      updateData,
      sessionUser
    );

    res.json({
      message: "Appointment updated successfully.",
      data: updatedAppointment,
    });
  }
);

export const deleteAppointmentController = asyncHandler(
  async (req: Request, res: Response) => {
    const sessionUser = (req.session as any)?.user;
    if (!sessionUser) {
      throw new UnauthorizedException("Not authorized");
    }

    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return res
        .status(HTTPSTATUS.BAD_REQUEST)
        .json({ message: "Invalid appointment ID format" });
    }
    const appointmentId = new Types.ObjectId(id);

    await deleteAppointmentService(appointmentId, sessionUser);

    res
      .status(HTTPSTATUS.OK)
      .json({ message: "Appointment deleted successfully." });
  }
);

export const getAppointmentByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const sessionUser = (req.session as any)?.user;
    if (!sessionUser) {
      throw new UnauthorizedException("Not authorized");
    }

    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return res
        .status(HTTPSTATUS.BAD_REQUEST)
        .json({ message: "Invalid appointment ID format" });
    }

    const appointment = await getAppointmentByIdService(
      new Types.ObjectId(id),
      sessionUser
    );

    return res.status(HTTPSTATUS.OK).json({
      message: "Appointment retrieved successfully.",
      data: appointment,
    });
  }
);

export const updateAppointmentStatusController = asyncHandler(
  async (req: Request, res: Response) => {
    const sessionUser = (req.session as any)?.user;
    if (!sessionUser) {
      throw new UnauthorizedException("Not authorized");
    }

    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return res
        .status(HTTPSTATUS.BAD_REQUEST)
        .json({ message: "Invalid appointment ID format" });
    }
    const appointmentId = new Types.ObjectId(id);
    const statusUpdateData = req.body as UpdateAppointmentStatusInput;

    const updatedAppointment = await updateAppointmentStatusService(
      appointmentId,
      statusUpdateData,
      sessionUser
    );

    res.json({
      message: "Appointment status updated successfully.",
      data: updatedAppointment,
    });
  }
);

import Appointment from "../models/appointment.model";
import {
  CreateAppointmentInput,
  UpdateAppointmentInput,
  UpdateAppointmentStatusInput,
} from "../validations/appointment.validation";
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "../utils/appError";
import { Types } from "mongoose";
import RoleModel from "../models/role.model";
import { ROLE } from "../enums/role.enum";
import { AppError } from "../utils/appError";
import User from "../models/user.model";
import Property from "../models/property.model";

// By importing the User and Property models here, we ensure they are registered
// with Mongoose before the service functions are called, which prevents the
// "Schema hasn't been registered" error during population.
// import "../models/user.model";
// import "../models/property.model";

type SessionUser = { _id: Types.ObjectId; roleId: Types.ObjectId };

export const createAppointmentService = async (
  appointmentData: CreateAppointmentInput,
  userId: Types.ObjectId
) => {
  try {
    const appointment = new Appointment({
      ...appointmentData,
      userId,
      requestedDateTime: new Date(appointmentData.requestedDateTime),
    });
    return await appointment.save();
  } catch (error: any) {
    throw new BadRequestException(
      `Could not create appointment: ${error.message}`
    );
  }
};

export const getAppointmentByIdService = async (
  appointmentId: Types.ObjectId,
  sessionUser: SessionUser
) => {
  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      throw new NotFoundException("Appointment not found");
    }
    const userRole = await RoleModel.findById(sessionUser.roleId);
    if (!userRole) {
      throw new UnauthorizedException("User role not found.");
    }
    return appointment;
  } catch (error: any) {
    throw new BadRequestException(
      `Could not get appointment by id: ${error.message}`
    );
  }
};

export const getAppointmentsService = async () => {
  try {
    const appointments = await Appointment.find()
      .populate({ path: "propertyId", model: Property, select: "title" })
      .populate({ path: "userId", model: User, select: "name -password" })
      .populate({ path: "agentId", model: User, select: "name -password" });
    return appointments;
  } catch (error: any) {
    throw new BadRequestException(
      `Could not get appointments: ${error.message}`
    );
  }
};

export const updateAppointmentService = async (
  appointmentId: Types.ObjectId,
  updateData: UpdateAppointmentInput,
  sessionUser: SessionUser
) => {
  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      throw new NotFoundException("Appointment not found");
    }

    const userRole = await RoleModel.findById(sessionUser.roleId);
    if (!userRole) {
      throw new UnauthorizedException("User role not found.");
    }

    // If the user is a regular 'User', they can only update their own appointments.
    // Admins and Agents can update any appointment (permission already checked by 'authorize' middleware).
    if (
      userRole.name === ROLE.USER &&
      appointment.userId.toString() !== sessionUser._id.toString()
    ) {
      throw new UnauthorizedException(
        "You are not authorized to update this appointment."
      );
    }

    Object.assign(appointment, updateData);
    if (updateData.requestedDateTime) {
      appointment.requestedDateTime = new Date(updateData.requestedDateTime);
    }

    await appointment.save();
    return appointment;
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new BadRequestException(
      `Could not update appointment: ${error.message}`
    );
  }
};

export const updateAppointmentStatusService = async (
  appointmentId: Types.ObjectId,
  statusUpdate: UpdateAppointmentStatusInput,
  sessionUser: SessionUser
) => {
  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      throw new NotFoundException("Appointment not found");
    }

    // The 'authorize(PERMISSION.APPROVE_APPOINTMENT)' middleware already ensures only Admins/Agents can access this.

    appointment.status = statusUpdate.status;

    // If the appointment is confirmed, set the confirmedDateTime
    if (statusUpdate.status === "Confirmed") {
      appointment.confirmedDateTime = new Date();
    }

    await appointment.save();
    return appointment;
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new BadRequestException(
      `Could not update appointment status: ${error.message}`
    );
  }
};

export const deleteAppointmentService = async (
  appointmentId: Types.ObjectId,
  sessionUser: SessionUser
) => {
  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      throw new NotFoundException("Appointment not found");
    }

    const userRole = await RoleModel.findById(sessionUser.roleId);
    if (!userRole) {
      throw new UnauthorizedException("User role not found.");
    }

    if (
      userRole.name === ROLE.USER &&
      appointment.userId.toString() !== sessionUser._id.toString()
    ) {
      throw new UnauthorizedException(
        "You are not authorized to delete this appointment."
      );
    }

    await Appointment.findByIdAndDelete(appointmentId);
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new BadRequestException(
      `Could not delete appointment: ${error.message}`
    );
  }
};

import { z } from "zod";
import { type Request, type Response, type NextFunction } from "express";
import { formatZodError } from "../utils/zod.util";
import { HTTPSTATUS } from "../config/http-status.config";
import mongoose from "mongoose";

export const createAppointmentSchema = z.object({
  propertyId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val)),
  agentId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val)),
  requestedDateTime: z.string().datetime(),
  notes: z.string().optional(),
});

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;

export const createAppointmentValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    createAppointmentSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(HTTPSTATUS.BAD_REQUEST).json(formatZodError(error));
    } else {
      res
        .status(HTTPSTATUS.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  }
};

export const updateAppointmentSchema = z
  .object({
    requestedDateTime: z.string().datetime().optional(),
    notes: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.requestedDateTime && !data.notes) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "At least one field must be provided for update",
      });
    }
  });

export type UpdateAppointmentInput = z.infer<typeof updateAppointmentSchema>;

export const updateAppointmentValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    updateAppointmentSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(HTTPSTATUS.BAD_REQUEST).json(formatZodError(error));
    } else {
      // Log unexpected errors for debugging
      console.error("Unexpected error in updateAppointmentValidation:", error);
      res
        .status(HTTPSTATUS.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  }
};

export const updateAppointmentStatusSchema = z.object({
  status: z.enum(["Pending", "Confirmed", "Cancelled", "Completed"]),
});

export type UpdateAppointmentStatusInput = z.infer<
  typeof updateAppointmentStatusSchema
>;

export const updateAppointmentStatusValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    updateAppointmentStatusSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(HTTPSTATUS.BAD_REQUEST).json(formatZodError(error));
    } else {
      console.error(
        "Unexpected error in updateAppointmentStatusValidation:",
        error
      );
      res
        .status(HTTPSTATUS.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  }
};

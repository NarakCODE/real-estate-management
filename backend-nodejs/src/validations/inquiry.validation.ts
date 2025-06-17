import { type Request, type Response, type NextFunction } from "express";
import { z } from "zod";
import { HTTPSTATUS } from "../config/http-status.config";

export const createInquirySchema = z.object({
  propertyId: z
    .string({
      required_error: "Property ID is required.",
    })
    .nonempty("Property ID cannot be empty."),
  message: z
    .string({
      required_error: "Message is required.",
    })
    .nonempty("Message cannot be empty.")
    .min(10, "Message must be at least 10 characters long."),
  name: z.string().optional(),
  email: z.string().email("Please provide a valid email.").optional(),
});

export const createInquiryValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    createInquirySchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(HTTPSTATUS.BAD_REQUEST).json({
        message: "Validation failed",
        errors: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    } else {
      res.status(HTTPSTATUS.BAD_REQUEST).json({
        message: "Invalid input data",
      });
    }
  }
};

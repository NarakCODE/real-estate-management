import { type Request, type Response, type NextFunction } from "express";
import { z } from "zod";
import { HTTPSTATUS } from "../config/http-status.config";
import { formatZodError } from "../utils/zod.util";

export const amenitySchema = z.object({
  name: z.string().min(1, "Amenity name is required"),
  description: z.string().optional(),
  iconUrl: z.string().url("Invalid URL format for icon").optional(),
});

export type CreateAmenityInput = z.infer<typeof amenitySchema>;
export type UpdateAmenityInput = Partial<CreateAmenityInput>;

export const createAmenityValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    amenitySchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(HTTPSTATUS.BAD_REQUEST).json(formatZodError(error));
    } else {
      res
        .status(HTTPSTATUS.INTERNAL_SERVER_ERROR)
        .json({ message: "An unexpected error occurred" });
    }
  }
};

export const updateAmenityValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    amenitySchema.partial().parse(req.body); // Allow partial updates
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(HTTPSTATUS.BAD_REQUEST).json(formatZodError(error));
    } else {
      res
        .status(HTTPSTATUS.INTERNAL_SERVER_ERROR)
        .json({ message: "An unexpected error occurred" });
    }
  }
};

import { z } from "zod";
import mongoose from "mongoose";
import { type Request, type Response, type NextFunction } from "express";
import { formatZodError } from "../utils/zod.util";
import { HTTPSTATUS } from "../config/http-status.config";

const objectIdValidation = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  });

export const createDealSchema = z.object({
  propertyId: objectIdValidation,
  agentId: objectIdValidation,
  clientId: objectIdValidation,
  dealType: z.enum(["Sale", "Rent"]),
  agreedPrice: z.number().positive(),
  currency: z.string().min(3).max(5),
  dealClosedAt: z.string().datetime(),
});

export type CreateDealInput = z.infer<typeof createDealSchema>;

export const validateDeal =
  (schema: z.ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(HTTPSTATUS.BAD_REQUEST).json(formatZodError(error));
      } else {
        next(error);
      }
    }
  };

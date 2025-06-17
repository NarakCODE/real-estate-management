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

export const createReviewSchema = z
  .object({
    propertyId: objectIdValidation.optional(),
    agentId: objectIdValidation.optional(),
    rating: z.number().int().min(1).max(5),
    comment: z.string().min(10, "Comment must be at least 10 characters long."),
  })
  .superRefine((data, ctx) => {
    if (!data.propertyId && !data.agentId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Either propertyId or agentId must be provided.",
        path: ["propertyId", "agentId"],
      });
    }
  });

export type CreateReviewInput = z.infer<typeof createReviewSchema>;

export const updateReviewSchema = z
  .object({
    rating: z.number().int().min(1).max(5).optional(),
    comment: z
      .string()
      .min(10, "Comment must be at least 10 characters long.")
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message:
      "At least one field (rating or comment) must be provided for update.",
  });

export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;

export const validate =
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

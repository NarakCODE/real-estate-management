import { z } from "zod";
import {
  PROPERTY_AVAILABILITY,
  PROPERTY_STATUS,
  PROPERTY_TYPE,
} from "../enums/property.enum";
import { type Request, type Response, type NextFunction } from "express";
import { formatZodError } from "../utils/zod.util";
import { HTTPSTATUS } from "../config/http-status.config";

const locationSchema = z.object({
  street: z.string().optional(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  country: z.string(),
  coordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
});

const featuresSchema = z.object({
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().min(0),
  area: z.number().min(0),
  lotSize: z.number().min(0).optional(),
  yearBuilt: z.number().int().min(1000).optional(),
  parkingSpots: z.number().int().min(0).optional(),
});

export const createPropertySchema = z.object({
  title: z.string().min(5),
  description: z.string().optional(),
  propertyType: z.enum(PROPERTY_TYPE),
  status: z.enum(PROPERTY_STATUS),
  availability: z.enum(PROPERTY_AVAILABILITY).default("Available"),
  price: z.number().min(0),
  currency: z.string().length(3).default("USD"),
  location: locationSchema,
  features: featuresSchema,
  images: z.array(z.string().url()).optional(),
  videoTourUrl: z.string().url().optional(),
  isFeatured: z.boolean().default(false),
});

export type CreatePropertyInput = z.infer<typeof createPropertySchema>;

export const createPropertyValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    createPropertySchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(HTTPSTATUS.BAD_REQUEST).json(formatZodError(error));
    }
    next(error);
  }
};

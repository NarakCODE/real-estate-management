import { type Request, type Response } from "express";
import { Types } from "mongoose";
import { HTTPSTATUS } from "../config/http-status.config";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import * as amenityService from "../services/amenity.service";
import {
  CreateAmenityInput,
  UpdateAmenityInput,
} from "../validations/amenity.validation";

export const createAmenityController = asyncHandler(
  async (req: Request, res: Response) => {
    const amenityData: CreateAmenityInput = req.body;
    const newAmenity = await amenityService.createAmenityService(amenityData);
    res.status(HTTPSTATUS.CREATED).json({
      message: "Amenity created successfully",
      data: newAmenity,
    });
  }
);

export const getAmenitiesController = asyncHandler(
  async (req: Request, res: Response) => {
    const amenities = await amenityService.getAmenitiesService();
    res.status(HTTPSTATUS.OK).json({
      message: "Amenities retrieved successfully",
      data: amenities,
    });
  }
);

export const getAmenityByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const { amenityId } = req.params;
    if (!Types.ObjectId.isValid(amenityId)) {
      res
        .status(HTTPSTATUS.BAD_REQUEST)
        .json({ message: "Invalid Amenity ID" });
      return;
    }
    const amenity = await amenityService.getAmenityByIdService(
      new Types.ObjectId(amenityId)
    );
    res.status(HTTPSTATUS.OK).json({
      message: "Amenity retrieved successfully",
      data: amenity,
    });
  }
);

export const updateAmenityController = asyncHandler(
  async (req: Request, res: Response) => {
    const { amenityId } = req.params;
    if (!Types.ObjectId.isValid(amenityId)) {
      res
        .status(HTTPSTATUS.BAD_REQUEST)
        .json({ message: "Invalid Amenity ID" });
      return;
    }
    const amenityData: UpdateAmenityInput = req.body;
    const updatedAmenity = await amenityService.updateAmenityService(
      new Types.ObjectId(amenityId),
      amenityData
    );
    res.status(HTTPSTATUS.OK).json({
      message: "Amenity updated successfully",
      data: updatedAmenity,
    });
  }
);

export const deleteAmenityController = asyncHandler(
  async (req: Request, res: Response) => {
    const { amenityId } = req.params;
    if (!Types.ObjectId.isValid(amenityId)) {
      res
        .status(HTTPSTATUS.BAD_REQUEST)
        .json({ message: "Invalid Amenity ID" });
      return;
    }
    await amenityService.deleteAmenityService(new Types.ObjectId(amenityId));
    res.status(HTTPSTATUS.OK).json({ message: "Amenity deleted successfully" });
  }
);

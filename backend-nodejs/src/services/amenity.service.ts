import { Types } from "mongoose";
import AmenityModel, { IAmenity } from "../models/amenity.model";
import {
  CreateAmenityInput,
  UpdateAmenityInput,
} from "../validations/amenity.validation";
import { BadRequestException, NotFoundException } from "../utils/appError";

export const createAmenityService = async (
  amenityData: CreateAmenityInput
): Promise<IAmenity> => {
  const existingAmenity = await AmenityModel.findOne({
    name: amenityData.name,
  });
  if (existingAmenity) {
    throw new BadRequestException(
      `Amenity with name '${amenityData.name}' already exists.`
    );
  }
  const newAmenity = new AmenityModel(amenityData);
  await newAmenity.save();
  return newAmenity;
};

export const getAmenitiesService = async (): Promise<IAmenity[]> => {
  return await AmenityModel.find({});
};

export const getAmenityByIdService = async (
  amenityId: Types.ObjectId
): Promise<IAmenity> => {
  const amenity = await AmenityModel.findById(amenityId);
  if (!amenity) {
    throw new NotFoundException("Amenity not found");
  }
  return amenity;
};

export const updateAmenityService = async (
  amenityId: Types.ObjectId,
  amenityData: UpdateAmenityInput
): Promise<IAmenity> => {
  const amenity = await AmenityModel.findById(amenityId);
  if (!amenity) {
    throw new NotFoundException("Amenity not found");
  }

  if (amenityData.name && amenityData.name !== amenity.name) {
    const existingAmenity = await AmenityModel.findOne({
      name: amenityData.name,
    });
    if (existingAmenity) {
      throw new BadRequestException(
        `Amenity with name '${amenityData.name}' already exists.`
      );
    }
  }

  Object.assign(amenity, amenityData);
  await amenity.save();
  return amenity;
};

export const deleteAmenityService = async (
  amenityId: Types.ObjectId
): Promise<void> => {
  const amenity = await AmenityModel.findByIdAndDelete(amenityId);
  if (!amenity) {
    throw new NotFoundException("Amenity not found");
  }
};

import { Types } from "mongoose";
import FavoriteModel, { IFavorite } from "../models/favorite.model";
import { BadRequestException, NotFoundException } from "../utils/appError";
import PropertyModel from "../models/property.model";

export const addFavoriteService = async (
  userId: Types.ObjectId,
  propertyId: Types.ObjectId
): Promise<IFavorite> => {
  if (!propertyId && userId) {
    throw new BadRequestException("Property ID is required");
  }

  const property = await PropertyModel.findById(propertyId);
  if (!property) {
    throw new NotFoundException("Property not found");
  }

  const existingFavorite = await FavoriteModel.findOne({
    userId,
    propertyId,
  });

  if (existingFavorite) {
    throw new BadRequestException("Property already in favorites");
  }

  const newFavorite = new FavoriteModel({ userId, propertyId });
  await newFavorite.save();
  return newFavorite;
};

export const getFavoritesService = async (userId: Types.ObjectId) => {
  const favorites = await FavoriteModel.find({ userId });
  return favorites;
};

export const removeFavoriteService = async (
  userId: Types.ObjectId,
  propertyId: Types.ObjectId
) => {
  await FavoriteModel.findOneAndDelete({ userId, propertyId });
};

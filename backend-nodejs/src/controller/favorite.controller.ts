import type { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http-status.config";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  addFavoriteService,
  getFavoritesService,
  removeFavoriteService,
} from "../services/favorite.service";
import { Types } from "mongoose";

export const addFavoriteController = asyncHandler(
  async (req: Request, res: Response) => {
    const sessionUser = (req.session as any).user;
    const userId = sessionUser._id;
    const propertyId = req.params.propertyId;
    await addFavoriteService(userId, new Types.ObjectId(propertyId));
    res.status(HTTPSTATUS.CREATED).json({
      message: "Property added to favorites",
    });
  }
);

export const getFavoritesController = asyncHandler(
  async (req: Request, res: Response) => {
    const sessionUser = (req.session as any).user;
    const userId = sessionUser._id;
    const favourites = await getFavoritesService(userId);
    res.status(HTTPSTATUS.OK).json({
      message: "Favorites fetched successfully",
      data: favourites,
    });
  }
);

export const removeFavoriteController = asyncHandler(
  async (req: Request, res: Response) => {
    const sessionUser = (req.session as any).user;
    const userId = sessionUser._id;
    const propertyId = req.params.propertyId;
    await removeFavoriteService(userId, new Types.ObjectId(propertyId));
    res.status(HTTPSTATUS.OK).json({
      message: "Property removed from favorites",
    });
  }
);

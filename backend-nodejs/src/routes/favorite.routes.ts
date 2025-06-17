import { Router } from "express";
import isAuthenticated from "../middlewares/auth.middleware";
import {
  addFavoriteController,
  getFavoritesController,
  removeFavoriteController,
} from "../controller/favorite.controller";

const favoriteRoutes = Router();

favoriteRoutes.get("/", isAuthenticated, getFavoritesController);
favoriteRoutes.post("/:propertyId", isAuthenticated, addFavoriteController);
favoriteRoutes.delete(
  "/:propertyId",
  isAuthenticated,
  removeFavoriteController
);

export default favoriteRoutes;

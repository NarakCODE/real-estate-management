import { Router } from "express";
import isAuthenticated from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorization.middleware";
import { PERMISSION } from "../enums/permission.enum";
import * as amenityController from "../controller/amenity.controller";
import {
    createAmenityValidation,
    updateAmenityValidation,
} from "../validations/amenity.validation";

const amenityRoutes = Router();

// All routes require authentication and MANAGE_AMENITIES permission
amenityRoutes.use(isAuthenticated);
// amenityRoutes.use(authorize(PERMISSION.MANAGE_AMENITIES));

amenityRoutes.post(
    "/",
    createAmenityValidation,
    amenityController.createAmenityController
);

amenityRoutes.get("/", amenityController.getAmenitiesController);

amenityRoutes.get("/:amenityId", amenityController.getAmenityByIdController);

amenityRoutes.put(
    "/:amenityId",
    updateAmenityValidation,
    amenityController.updateAmenityController
);

amenityRoutes.delete("/:amenityId", amenityController.deleteAmenityController);

export default amenityRoutes;

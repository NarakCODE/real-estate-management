import { Router } from "express";
import * as propertyController from "../controller/property.controller";
import { createPropertyValidation } from "../validations/property.validation";
import isAuthenticated from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorization.middleware";
import { PERMISSION } from "../enums/permission.enum";

const propertyRoutes = Router();

propertyRoutes.post(
  "/create",
  isAuthenticated,
  authorize(PERMISSION.CREATE_PROPERTY),
  createPropertyValidation,
  propertyController.createProperty
);
propertyRoutes.get("/", propertyController.getProperties);
propertyRoutes.get(
  "/user",
  isAuthenticated,
  propertyController.getUserProperties
);
propertyRoutes.get("/:id", propertyController.getPropertyById);
propertyRoutes.put("/edit/:id", propertyController.updateProperty);
propertyRoutes.delete("/delete/:id", propertyController.deleteProperty);

export default propertyRoutes;

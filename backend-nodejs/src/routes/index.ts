import { Router } from "express";
import authRoutes from "./auth.routes";
import propertyRoutes from "./property.routes";
import favoriteRoutes from "./favorite.routes";
import inquiryRoutes from "./inquiry.routes";
import userRoutes from "./user.routes";
import roleRoutes from "./role.routes";
import amenityRoutes from "./amenity.routes";
import appointmentRoutes from "./appointment.routes";
import reviewRoutes from "./review.routes";
import dealRoutes from "./deal.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/properties", propertyRoutes);
router.use("/favorites", favoriteRoutes);
router.use("/inquiries", inquiryRoutes);
router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/amenities", amenityRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/reviews", reviewRoutes);
router.use("/deals", dealRoutes);

export default router;

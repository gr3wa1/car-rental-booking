import { Router } from "express";
import {
  acceptBookingAdmin,
  declineBookingAdmin,
  getAdminDashboard,
  getAllBookingsAdmin,
  getAllUsersAdmin,
} from "./admin.controller";

import { authenticate } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";

const router = Router();

router.use("/", authenticate, roleMiddleware("admin"));

router.get("/dashboard", getAdminDashboard);
router.get("/users", getAllUsersAdmin);
router.get("/bookings", getAllBookingsAdmin);
router.patch("/bookings/:id/accept", acceptBookingAdmin);
router.patch("/bookings/:id/decline", declineBookingAdmin);

export default router;

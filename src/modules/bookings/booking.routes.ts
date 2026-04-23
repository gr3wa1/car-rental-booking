import { Router } from "express";
import {
  acceptBooking,
  createGuestBooking,
  createUserBooking,
  declineBooking,
  getAllBookings,
  getMyBookings,
} from "./booking.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createUserBooking);
router.post("/guest", createGuestBooking);
router.get("/my", authMiddleware, getMyBookings);
router.get("/", getAllBookings);
router.patch("/:id/accept", acceptBooking);
router.patch("/:id/decline", declineBooking);

export default router;

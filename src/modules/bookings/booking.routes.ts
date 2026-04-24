import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  res.status(201).json({
    success: true,
    message: "Booking route working",
  });
});

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Bookings fetched successfully",
  });
});

export default router;

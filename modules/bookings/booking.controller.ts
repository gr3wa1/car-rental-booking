import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { validateBookingInput } from "../../validations/booking.validation";
import {
  createBookingService,
  getAllBookingsService,
  getMyBookingsService,
  updateBookingStatusService,
} from "./booking.service";

export const createUserBooking = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    validateBookingInput(req.body);

    const result = await createBookingService({
      userId: req.user?.userId,
      carId: req.body.carId,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  },
);

export const createGuestBooking = asyncHandler(
  async (req: Request, res: Response) => {
    validateBookingInput(req.body);

    const result = await createBookingService({
      guestName: req.body.guestName,
      guestEmail: req.body.guestEmail,
      carId: req.body.carId,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    });

    res.status(201).json({
      success: true,
      message: "Guest booking created successfully",
      data: result,
    });
  },
);

export const getMyBookings = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const result = await getMyBookingsService(req.user!.userId);

    res.status(200).json({
      success: true,
      message: "My bookings fetched successfully",
      data: result,
    });
  },
);

export const getAllBookings = asyncHandler(
  async (_req: Request, res: Response) => {
    const result = await getAllBookingsService();

    res.status(200).json({
      success: true,
      message: "All bookings fetched successfully",
      data: result,
    });
  },
);

export const acceptBooking = asyncHandler(
  async (req: Request, res: Response) => {
    const bookingId = req.params.id as string;

    const result = await updateBookingStatusService(bookingId, "accepted");

    res.status(200).json({
      success: true,
      message: "Booking accepted successfully",
      data: result,
    });
  },
);

export const declineBooking = asyncHandler(
  async (req: Request, res: Response) => {
    const bookingId = req.params.id as string;

    const result = await updateBookingStatusService(bookingId, "declined");

    res.status(200).json({
      success: true,
      message: "Booking declined successfully",
      data: result,
    });
  },
);

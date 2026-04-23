import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import {
  getAdminDashboardService,
  getAllBookingsAdminService,
  getAllUsersAdminService,
  updateBookingStatusAdminService,
} from "./admin.service";

export const getAdminDashboard = asyncHandler(
  async (_req: Request, res: Response) => {
    const result = await getAdminDashboardService();

    res.status(200).json({
      success: true,
      message: "Admin dashboard fetched successfully",
      data: result,
    });
  },
);

export const getAllUsersAdmin = asyncHandler(
  async (_req: Request, res: Response) => {
    const result = await getAllUsersAdminService();

    res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      data: result,
    });
  },
);

export const getAllBookingsAdmin = asyncHandler(
  async (_req: Request, res: Response) => {
    const result = await getAllBookingsAdminService();

    res.status(200).json({
      success: true,
      message: "All bookings fetched successfully",
      data: result,
    });
  },
);

export const acceptBookingAdmin = asyncHandler(
  async (req: Request, res: Response) => {
    const bookingId = req.params.id as string;

    const result = await updateBookingStatusAdminService(bookingId, "accepted");

    res.status(200).json({
      success: true,
      message: "Booking accepted successfully",
      data: result,
    });
  },
);

export const declineBookingAdmin = asyncHandler(
  async (req: Request, res: Response) => {
    const bookingId = req.params.id as string;

    const result = await updateBookingStatusAdminService(bookingId, "declined");

    res.status(200).json({
      success: true,
      message: "Booking declined successfully",
      data: result,
    });
  },
);

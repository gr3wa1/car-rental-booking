import { AppError } from "../../core/errors/AppError";
import { logger } from "../../utils/logger";
import Car from "../cars/car.model";
import Booking from "./booking.model";

const calculateDays = (startDate: Date, endDate: Date): number => {
  const difference = endDate.getTime() - startDate.getTime();
  const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 1;
};

export const createBookingService = async (payload: {
  userId?: string;
  guestName?: string;
  guestEmail?: string;
  carId: string;
  startDate: string;
  endDate: string;
}) => {
  const car = await Car.findById(payload.carId);

  if (!car) {
    throw new AppError(404, "Car not found");
  }

  const start = new Date(payload.startDate);
  const end = new Date(payload.endDate);

  if (end <= start) {
    throw new AppError(400, "End date must be after start date");
  }

  const existingBooking = await Booking.findOne({
    carId: payload.carId,
    status: { $in: ["pending", "accepted"] },
    startDate: { $lt: end },
    endDate: { $gt: start },
  });

  if (existingBooking) {
    throw new AppError(400, "Car is already booked for selected dates");
  }

  const days = calculateDays(start, end);
  const totalPrice = days * car.pricePerDay;

  const booking = await Booking.create({
    userId: payload.userId,
    guestName: payload.guestName,
    guestEmail: payload.guestEmail,
    carId: payload.carId,
    startDate: start,
    endDate: end,
    totalPrice,
    status: "pending",
  });

  logger(`Booking created: ${booking._id}`);

  return booking;
};

export const getMyBookingsService = async (userId: string) => {
  return await Booking.find({ userId }).populate("carId");
};

export const getAllBookingsService = async () => {
  return await Booking.find().populate("carId").populate("userId");
};

export const updateBookingStatusService = async (
  bookingId: string,
  status: "accepted" | "declined",
) => {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new AppError(404, "Booking not found");
  }

  booking.status = status;
  await booking.save();

  logger(`Booking ${bookingId} updated to ${status}`);

  return booking;
};

import Booking from "../bookings/booking.model";
import Car from "../cars/car.model";
import User from "../users/user.model";

export const getAdminDashboardService = async () => {
  const totalUsers = await User.countDocuments();
  const totalCars = await Car.countDocuments();
  const totalBookings = await Booking.countDocuments();
  const acceptedBookings = await Booking.countDocuments({ status: "accepted" });
  const declinedBookings = await Booking.countDocuments({ status: "declined" });
  const pendingBookings = await Booking.countDocuments({ status: "pending" });

  return {
    totalUsers,
    totalCars,
    totalBookings,
    acceptedBookings,
    declinedBookings,
    pendingBookings,
  };
};

export const getAllUsersAdminService = async () => {
  return await User.find().select("-password");
};

export const getAllBookingsAdminService = async () => {
  return await Booking.find().populate("carId").populate("userId");
};

export const updateBookingStatusAdminService = async (
  bookingId: string,
  status: "accepted" | "declined",
) => {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new Error("Booking not found");
  }

  booking.status = status;
  await booking.save();

  return booking;
};

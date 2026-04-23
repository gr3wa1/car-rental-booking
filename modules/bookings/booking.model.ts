import mongoose, { Document, Schema, Types } from "mongoose";

export interface IBooking extends Document {
  userId?: Types.ObjectId;
  guestName?: string;
  guestEmail?: string;
  carId: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: "pending" | "accepted" | "declined";
}

const bookingSchema = new Schema<IBooking>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    guestName: {
      type: String,
      required: false,
      trim: true,
    },
    guestEmail: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },
    carId: {
      type: Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

const Booking = mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;

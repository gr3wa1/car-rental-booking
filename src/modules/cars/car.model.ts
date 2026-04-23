import mongoose, { Schema, Model } from "mongoose";

export interface ICar {
  name: string;
  brand: string;
  model: string;
  year: number;
  pricePerDay: number;
  color: string;
  fuelType: string;
  transmission: string;
  seats: number;
  image: string;
  isAvailable: boolean;
}

const carSchema = new Schema<ICar>(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    year: { type: Number, required: true },
    pricePerDay: { type: Number, required: true },
    color: { type: String, required: true, trim: true },
    fuelType: { type: String, required: true, trim: true },
    transmission: { type: String, required: true, trim: true },
    seats: { type: Number, required: true },
    image: { type: String, required: true, trim: true },
    isAvailable: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Car: Model<ICar> =
  mongoose.models.Car || mongoose.model<ICar>("Car", carSchema);

export default Car;
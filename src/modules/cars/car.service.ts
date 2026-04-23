import { AppError } from "../../core/errors/AppError";
import Car from "./car.model";

export const createCarService = async (payload: {
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
}) => {
  return await Car.create(payload);
};

export const getAllCarsService = async () => {
  return await Car.find();
};

export const getSingleCarService = async (carId: string) => {
  const car = await Car.findById(carId);

  if (!car) {
    throw new AppError(404, "Car not found");
  }

  return car;
};

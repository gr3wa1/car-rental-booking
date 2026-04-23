import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import {
  createCarService,
  getAllCarsService,
  getSingleCarService,
} from "./car.service";

export const addCar = asyncHandler(async (req: Request, res: Response) => {
  const result = await createCarService(req.body);

  res.status(201).json({
    success: true,
    message: "Car created successfully",
    data: result,
  });
});

export const getCars = asyncHandler(async (_req: Request, res: Response) => {
  const result = await getAllCarsService();

  res.status(200).json({
    success: true,
    message: "Cars fetched successfully",
    data: result,
  });
});

export const getSingleCar = asyncHandler(
  async (req: Request, res: Response) => {
    const carId = req.params.id as string;

    const result = await getSingleCarService(carId);

    res.status(200).json({
      success: true,
      message: "Car fetched successfully",
      data: result,
    });
  },
);

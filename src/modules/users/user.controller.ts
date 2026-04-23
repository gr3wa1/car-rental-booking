import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { AuthRequest } from "../../middlewares/auth.middleware";

import {
  getAllUsersService,
  getSingleUserService,
  getMyProfileService,
  updateMyProfileService,
} from "./user.service";

export const getAllUsers = asyncHandler(
  async (_req: Request, res: Response) => {
    const result = await getAllUsersService();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: result,
    });
  },
);

export const getSingleUser = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.params.id as string;
    const result = await getSingleUserService(userId);

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: result,
    });
  },
);

export const getMyProfile = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const result = await getMyProfileService(req.user!.userId);

    res.status(200).json({
      success: true,
      message: "My profile fetched successfully",
      data: result,
    });
  },
);

export const updateMyProfile = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const result = await updateMyProfileService(req.user!.userId, req.body);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: result,
    });
  },
);

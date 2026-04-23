import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { loginUserService, registerUserService } from "./auth.service";
import { validateLoginInput, validateRegisterInput } from "./auth.validation";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    validateRegisterInput(req.body);
    const result = await registerUserService(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  },
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  validateLoginInput(req.body);
  const result = await loginUserService(req.body);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
});

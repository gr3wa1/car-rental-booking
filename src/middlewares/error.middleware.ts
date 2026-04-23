// src/middlewares/error.middleware.ts

import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
};

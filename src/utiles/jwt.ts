import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const generateToken = (payload: {
  userId: string;
  email: string;
  role: string;
}): string => {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: "7d" });
};

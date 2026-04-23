import { AppError } from "../../core/errors/AppError";
import { comparePassword, hashPassword } from "../../utils/hash";
import { generateToken } from "../../utils/jwt";
import { logger } from "../../utils/logger";
import User from "../users/user.model";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export const registerUserService = async ({
  name,
  email,
  password,
  phone,
}: RegisterInput) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError(400, "User already exists with this email");
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
  });

  logger(`User registered: ${user.email}`);

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

export const loginUserService = async ({ email, password }: LoginInput) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(401, "Invalid email or password");
  }

  const isPasswordMatched = await comparePassword(password, user.password);

  if (!isPasswordMatched) {
    throw new AppError(401, "Invalid email or password");
  }

  const token = generateToken({
    userId: String(user._id),
    email: user.email,
    role: user.role,
  });

  logger(`User logged in: ${user.email}`);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/users/user.routes";
import carRoutes from "./modules/cars/car.routes";
import bookingRoutes from "./modules/bookings/booking.routes";
import adminRoutes from "./modules/admin/admin.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Car Rental Booking API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorMiddleware);

export default app;

import { Router } from "express";
import { addCar, getCars, getSingleCar } from "./car.controller";

const router = Router();

router.post("/", addCar);
router.get("/", getCars);
router.get("/:id", getSingleCar);

export default router;

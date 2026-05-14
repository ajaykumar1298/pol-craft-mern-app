import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { submitResponse } from "../controllers/response.controller.js";

const router = express.Router();
router.post("/submit", protect, submitResponse);

export default router;

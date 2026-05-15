import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { submitResponse } from "../controllers/response.controller.js";

const router = express.Router();
// router.post("/submit", protect, submitResponse);
router.post("/submit", submitResponse);

export default router;

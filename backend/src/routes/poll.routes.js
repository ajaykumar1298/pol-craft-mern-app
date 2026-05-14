import express from "express";
import protect from "../middlewares/auth.middleware.js";
import * as pollController from "../controllers/poll.controller.js";

const router = express.Router();

router.post("/create", protect, pollController.createPoll);
router.get("/:slug", pollController.getPollBySlug);
router.get("/analytics/:id", protect, pollController.getAnalytics);
router.patch("/publish/:id", protect, pollController.publishResult);

export default router;

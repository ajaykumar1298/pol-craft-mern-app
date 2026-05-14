import pollModel from "../models/poll.model.js";
import responseModel from "../models/response.model.js";
import { io } from "../socket/socket.js";

export const submitResponse = async (req, res) => {
  try {
    const { pollId, answers } = req.body;

    const poll = await pollModel.findById(pollId);

    if (!poll) {
      return res.status(404).json({
        success: false,
        message: "poll not found",
      });
    }

    if (!poll.isActive || new Date() > poll.expiresAt) {
      return res.status(400).json({
        success: false,
        message: "Poll expired",
      });
    }

    if (poll.responseMode === "authenticated" && !req.user) {
      return res.status(401).json({
        success: false,
        message: "Login required",
      });
    }

    const response = await Response.create({
      pollId,
      answers,
      userId: req.user?._id || null,
    });

    poll.totalResponses += 1;

    await poll.save();

    io.emit("poll-update", {
      pollId,
      totalResponses: poll.totalResponses,
    });

    return res.status(201).json({
      success: true,
      message: "response submitted successfully",
      response,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
    });
  }
};

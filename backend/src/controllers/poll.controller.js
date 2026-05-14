import pollModel from "../models/poll.model.js";
import responseModel from "../models/response.model.js";
import generateSlug from "../utils/generateSlug.js";

async function createPoll(req, res) {
  try {
    const { title, desc, questions, responseMode, expiresAt } = req.body;
    const poll = await pollModel.create({
      title,
      desc,
      questions,
      responseMode,
      expiresAt,
      createdBy: req.user._id,
      slug: generateSlug(title),
    });
    return res.status(201).json({
      success: true,
      message: "Poll is created",
      poll,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}

async function getPollBySlug(req, res) {
  try {
    const poll = await pollModel.findOne({ slug: req.param.slug });
    if (!poll) {
      return res.status(404).json({
        success: false,
        message: "poll not found",
      });
    }
    if (new Date() > poll.expiresAt) {
      poll.isActive = false;
      await poll.save();
    }
    return res.status(200).json({
      success: true,
      message: "update poll successfully",
      poll,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}

async function publishResult(req, res) {
  try {
    const poll = await pollModel.findOne(req.params?.is);
    if (!poll) {
      return res.status(404).json({
        success: false,
        message: "poll not found",
      });
    }
    poll.isResultPublished = true;
    await poll.save();

    return res.status(200).json({
      success: false,
      message: "result publish",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}

async function getAnalytics(req, res) {
  try {
    const pollId = req.params.id;
    const poll = await pollModel.findById(pollId);
    const responses = await responseModel.find({ pollId });
    const analytics = poll.questions.map((q) => {
      const options = q.options.map((opt) => {
        let count = 0;

        responses.forEach((r) => {
          r.answers.forEach((a) => {
            if (
              a.questionId.toString() === q._id.toString() &&
              a.selectedOptionId.toString() === opt._id.toString()
            ) {
              count++;
            }
          });
        });

        return {
          option: opt.text,
          count,
        };
      });

      return {
        question: q.question,
        options,
      };
    });
    return res.status(200).json({
      success: true,
      message: "fetched analytics successfully",
      data: {
        totalResponses: responses.length,
        analytics,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}

export { createPoll, getPollBySlug, publishResult, getAnalytics };

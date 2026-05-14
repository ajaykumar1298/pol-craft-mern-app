import mongoose from "mongoose";

const answersSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  selectedOptionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const responseSchema = new mongoose.Schema(
  {
    pollId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "poll",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: null,
    },
    answers: {
      type: [answersSchema],
      validate: {
        validator: (val) => val.length > 0,
        message: "At least one answer is required",
      },
    },
  },
  {
    timestamps: true,
  },
);

const responseModel = mongoose.model("response", responseSchema);

export default responseModel;

import mongoose from "mongoose";

const optSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: true },
);

const QSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },
  options: {
    type: [optSchema],
    validate: {
      validator: (val) => val.length >= 2,
      message: "Each question must have at least 2 options",
    },
  },

  required: {
    type: Boolean,
    default: false,
  },
});

const pollSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    questions: {
      type: [QSchema],
      validate: {
        validator: (val) => val.length > 0,
        message: "At least one question is required",
      },
    },
    responseMode: {
      type: String,
      enum: ["anonymous", "authenticated"],
      default: "anonymous",
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isResultPublished: {
      type: Boolean,
      default: false,
    },
    totalResponses: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const pollModel = mongoose.model("poll", pollSchema);
export default pollModel;

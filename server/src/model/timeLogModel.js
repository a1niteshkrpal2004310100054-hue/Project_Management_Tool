import mongoose, { Schema } from "mongoose";

const timeLogSchema = new Schema(
  {
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    hours: {
      type: Number,
    },
    date: Date,
  },
  { timestamps: true }
);

export const Timelog = mongoose.model("Timelog", timeLogSchema);

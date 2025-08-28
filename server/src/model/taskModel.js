import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Done"],
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },

    timeLogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Timelog",
      },
    ],
  },
  { timestamps: true }
);

export const team = mongoose.model("Team", taskSchema);

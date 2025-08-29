import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tast",
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive", "onhold", "pending", "completed"],
      default: "inactive",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    starts: { type: Date },
    end: { type: Date },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);

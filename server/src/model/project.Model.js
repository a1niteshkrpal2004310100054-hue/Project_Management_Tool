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
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tast",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const team = mongoose.model("Team", projectSchema);

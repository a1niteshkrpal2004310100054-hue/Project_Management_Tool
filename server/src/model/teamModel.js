import mongoose, { Schema } from "mongoose";

const teamSchema = new Schema(
  {
    name: String,
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  { timestamps: true }
);

export const team = mongoose.model("Team", teamSchema);

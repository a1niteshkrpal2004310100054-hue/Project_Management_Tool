import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      require: [true, "please provide a password"],
    },
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

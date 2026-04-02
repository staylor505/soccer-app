import mongoose from "mongoose";

const Schema = mongoose.Schema;

const normalizeRating = (value) => {
  if (value === "" || value === null || value === undefined) {
    return undefined;
  }

  return Number(value);
};

export const PlayerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address."],
    },
    phone: {
      type: String,
      trim: true,
    },
    iscoach: {
      type: Boolean,
      default: false,
    },
    team: {
      type: String,
      trim: true,
    },
    speed: {
      type: Number,
      min: 1,
      max: 5,
      set: normalizeRating,
    },
    strength: {
      type: Number,
      min: 1,
      max: 5,
      set: normalizeRating,
    },
    endurance: {
      type: Number,
      min: 1,
      max: 5,
      set: normalizeRating,
    },
    ability: {
      type: Number,
      min: 1,
      max: 5,
      set: normalizeRating,
    },
    techniques: {
      type: Number,
      min: 1,
      max: 5,
      set: normalizeRating,
    },
    tactical: {
      type: Number,
      min: 1,
      max: 5,
      set: normalizeRating,
    },
    image: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_date",
      updatedAt: "updated_date",
    },
  }
);

const Player = mongoose.models.Player || mongoose.model("Player", PlayerSchema);

export default Player;

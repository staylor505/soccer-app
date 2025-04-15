import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const PlayerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  iscoach: {
    type: Boolean,
    default: false,
  },
  team: {
    type: String,
  },
  speed: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
  },
  strength: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
  },
  endurance: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
  },
  ability: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
  },
  techniques: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
  },
  tactical: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

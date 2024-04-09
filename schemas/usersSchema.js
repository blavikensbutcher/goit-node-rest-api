import Joi from "joi";
import { Schema, model } from "mongoose";
import {subsLevels} from "../constants/subsLevels.js";

////////////////////MONGOOSE VALIDATION /////////////////////

const usersSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: Object.values(subsLevels), /** Subscription lvls @returns: ['starter', 'pro', 'business'] */
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false },
);

////////////////////JOI VALIDATION ///////////////////////

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
  subscription: Joi.string(),
  token: Joi.string(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});

////////////////////EXPORT VALIDATION /////////////////////

export const User = model("user", usersSchema);

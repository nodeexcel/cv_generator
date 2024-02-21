import mongoose from "mongoose";
import { constant } from "./constants.js";

export const dbConnection = async () => {
  try {
    await mongoose.connect(constant.DB_URL);
    console.log("database connected successfully");
  } catch (error) {
    console.log(error.message);
  }
}

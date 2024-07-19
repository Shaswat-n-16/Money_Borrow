import mongoose from "mongoose";
import { hashPassword } from "../../utils/auth.utils.js";

const UserSchema = new mongoose.Schema({
  phoneNumber: String,
  email: String,
  name: String,
  dateOfBirth: Date,
  monthlySalary: Number,
  registrationDate: Date,
  applicationStatus: String, // "approved" or "rejected"
  purchasePower: Number,
  password: String, // hashed password
});

// middlewares
UserSchema.pre("save", async function (next) {
  console.log("hasing password");
  if (!this.isModified("password")) return next();
  const hashedPassword = await hashPassword(this.password);
  this.password = hashedPassword;
  next();
});

// static method
UserSchema.statics.exists = async function (id) {
  try {
    const user = await this.findOne({ _id: id });
    if (user) throw new Error("User already exists");
    return user;
  } catch (error) {
    throw error;
  }
};

UserSchema.statics.findByEmail = async function (email) {
  try {
    console.log(email);
    const user = await this.findOne({ email });
    if (user) throw new Error("User already exists");
    return;
  } catch (error) {
    throw error;
  }
};
// Create a model for the user
export const User = mongoose.model("User", UserSchema);

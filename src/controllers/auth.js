// controllers/signup.js
import { User } from "../db/schema/User.js";
import { comparePassword, hashPassword } from "../utils/auth.utils.js";
import {
  generateResetToken,
  generateToken,
  verifyAuthToken,
  verifyResetToken,
} from "../utils/token.js";
import { validationResult } from "express-validator";

export const signup = async (req, res) => {
  // check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      success: false,
      data: errors.array(),
    });
  }
  const { phoneNumber, email, name, dateOfBirth, monthlySalary, password } =
    req.body;

  // Validate user age
  const age = calculateAge(dateOfBirth);
  if (age < 20) {
    return res
      .status(400)
      .send({ error: "User must be above 20 years of age." });
  }

  // Validate monthly salary
  if (monthlySalary < 25000) {
    return res
      .status(400)
      .send({ error: "Monthly salary must be 25k or more." });
  }

  const createdUser = await User.create({
    phoneNumber,
    email,
    name,
    dateOfBirth,
    monthlySalary,
    registrationDate: new Date(),
    applicationStatus: "approved",
    purchasePower: calculatePurchasePower(monthlySalary),
    password,
  });

  try {
    await createdUser.save();
    res.send({ message: "User registered successfully." });
  } catch (err) {
    res.status(500).send({ error: "Error registering user." });
  }
};

function calculateAge(dateOfBirth) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

// Calculate purchase power based on monthly salary
function calculatePurchasePower(monthlySalary) {
  //  Let's assume purchase power is 2 times the monthly salary
  return monthlySalary * 2;
}

export const login = async (req, res, next) => {
  try {
    // check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        success: false,
        data: errors.array(),
      });
    }
    // validate this data
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    //check user
    if (!user) {
      return res.status(400).json({
        message: "user doesn't exist",
        success: false,
        data: null,
      });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
        data: null,
      });
    }
    // generate a token
    const token = generateToken({
      id: user._id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      name: user.name,
    });
    return res.status(201).json({
      message: "token created successfully",
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          phoneNumber: user.phoneNumber,
          name: user.name,
        },
      },
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

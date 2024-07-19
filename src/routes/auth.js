import { Router } from "express";
import { body } from "express-validator";
import { signup, login } from "../controllers/auth.js";
import { User } from "../db/schema/User.js";
const router = Router();

router.post(
  "/signup",
  // validate using express-validator
  // create a custom validator
  body("email").custom(async (value) => await User.findByEmail(value)),
  body("email").isEmail().withMessage("Please enter a valid email."),
  body("password").trim().isLength({ min: 5 }),
  body("name").trim().not().isEmpty(),
  signup
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Please enter a valid email."),
  login
);

export default router;

import { User } from "../db/schema/User.js";

export const getUserData = async (req, res) => {
  const userId = req.user.id; // Get user ID from JWT token

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ error: "User not found." });
    }

    const userData = {
      purchasePower: user.purchasePower,
      phoneNumber: user.phoneNumber,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      monthlySalary: user.monthlySalary,
      registrationDate: user.registrationDate,
    };

    res.status(200).send(userData);
  } catch (err) {
    res.status(500).send({ error: "Error fetching user data." });
  }
};

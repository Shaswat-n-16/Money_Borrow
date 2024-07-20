import { User } from "../db/schema/User.js";
export const borrowMoney = async (req, res) => {
  const userId = req.user.id;
  const amount = req.body.amount;
  console.log(userId, amount);
  try {
    // Retrieve User Data from database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Calculate tenure of repayments (for 12 months)
    const tenure = 12;

    // Calculate monthly repayment amount with 8% interest rate
    const monthlyRepayment = calculateMonthlyRepayment(amount, tenure, 0.08);

    // Update user's Purchase Power amount
    user.purchasePower -= amount;
    await user.save();

    // Return updated Purchase Power amount and monthly repayment amount
    res.status(200).json({
      purchasePower: user.purchasePower,
      monthlyRepayment: monthlyRepayment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to calculate monthly repayment amount
function calculateMonthlyRepayment(amount, tenure, interestRate) {
  const monthlyInterestRate = interestRate / 12;
  const monthlyRepayment =
    (amount * monthlyInterestRate * (1 + monthlyInterestRate) ** tenure) /
    ((1 + monthlyInterestRate) ** tenure - 1);
  return monthlyRepayment.toFixed(2); // Round to 2 decimal places
}

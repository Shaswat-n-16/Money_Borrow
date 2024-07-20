import { verifyAuthToken } from "../utils/token.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      console.log("No token provided");
      return res.status(401).json({
        message: "No token provided",
        success: false,
      });
    }
    const decoded = verifyAuthToken(token);
    if (!decoded) {
      console.log("Invalid token");
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

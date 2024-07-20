import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.AUTH_SECRET, { expiresIn: "1d" });
};

export const verifyAuthToken = (token) => {
  try {
    const tokenWithoutBearer = token.replace(/^Bearer /, "");
    const payload = jwt.verify(tokenWithoutBearer, "auth_token_22");
    return payload;
  } catch (error) {
    console.log(error);
    return null;
  }
};

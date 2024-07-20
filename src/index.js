import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import transactionRoutes from "./routes/borrow.js";
import { connectDB } from "./utils/db.utils.js";
const app = express();
const PORT = process.env.PORT || 8080;

connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/data", userRoutes);
app.use("/transaction", transactionRoutes);

app.get("/", (req, res) => {
  res.send(`Verion 1.0 of Server is running `);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

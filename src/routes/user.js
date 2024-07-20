import { Router } from "express";
import { getUserData } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/authentication.js";
const router = Router();

router.get("/user", isAuthenticated, getUserData);

export default router;

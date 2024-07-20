import { Router } from "express";
import { borrowMoney } from "../controllers/borrow.js";
import { isAuthenticated } from "../middleware/authentication.js";
const router = Router();

router.post("/borrow", isAuthenticated, borrowMoney);

export default router;

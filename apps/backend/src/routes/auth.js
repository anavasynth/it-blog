import { Router } from "express";
import { login, logout } from "../controllers/auth.js";

const router = Router();

router.post("/login", login);   // POST /api/auth/login — авторизація
router.post("/logout", logout); // POST /api/auth/logout — вихід

export default router;
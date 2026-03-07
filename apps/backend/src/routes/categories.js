import { Router } from "express";
import { getCategories, getArticlesByCategory } from "../controllers/categories.js";

const router = Router();

// Публічні ендпоінти
router.get("/", getCategories);                   // GET /api/categories — всі категорії
router.get("/:slug/articles", getArticlesByCategory); // GET /api/categories/:slug/articles — статті категорії

export default router;
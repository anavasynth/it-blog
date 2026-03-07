import { Router } from "express";
import { getAuthorBySlug, getArticlesByAuthor } from "../controllers/authors.js";

const router = Router();

// Публічні ендпоінти
router.get("/:slug", getAuthorBySlug);           // GET /api/authors/:slug — профіль автора
router.get("/:slug/articles", getArticlesByAuthor); // GET /api/authors/:slug/articles — статті автора

export default router;
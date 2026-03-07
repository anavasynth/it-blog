import { Router } from "express";
import { getArticles, getArticleBySlug, getRelatedArticles, incrementViews } from "../controllers/articles.js";

const router = Router();

// Публічні ендпоінти
router.get("/", getArticles);                     // GET /api/articles — список статей
router.get("/:slug", getArticleBySlug);          // GET /api/articles/:slug — стаття за slug
router.get("/:slug/related", getRelatedArticles);// GET /api/articles/:slug/related — пов'язані статті
router.post("/:id/view", incrementViews);        // POST /api/articles/:id/view — збільшити лічильник переглядів

export default router;
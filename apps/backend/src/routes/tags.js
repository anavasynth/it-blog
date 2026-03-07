import { Router } from "express";
import { getTags, getArticlesByTag } from "../controllers/tags.js";

const router = Router();

// Публічні ендпоінти
router.get("/", getTags);                        // GET /api/tags — список тегів
router.get("/:slug/articles", getArticlesByTag);// GET /api/tags/:slug/articles — статті з тегом

export default router;
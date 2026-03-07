import { Router } from "express";
import { getCategories, getArticlesByCategory } from "../controllers/categories.js";

const router = Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Отримати список категорій
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Список категорій
 */
router.get("/", getCategories);

/**
 * @swagger
 * /categories/{slug}/articles:
 *   get:
 *     summary: Отримати статті конкретної категорії
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Список статей
 */
router.get("/:slug/articles", getArticlesByCategory);

export default router;
import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();
router.use(authMiddleware); // всі маршрути захищені

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Адмінські ендпоінти
 */

/**
 * @swagger
 * /admin/articles:
 *   get:
 *     summary: Отримати всі статті (включно з чернетками)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список статей
 */
router.get("/articles", (req, res) => res.json([]));

/**
 * @swagger
 * /admin/articles:
 *   post:
 *     summary: Створити нову статтю
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Стаття створена
 */
router.post("/articles", (req, res) => res.json({ message: "Article created" }));

/**
 * @swagger
 * /admin/articles/{id}:
 *   put:
 *     summary: Оновити статтю
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Стаття оновлена
 */
router.put("/articles/:id", (req, res) => res.json({ message: "Article updated" }));

/**
 * @swagger
 * /admin/articles/{id}:
 *   delete:
 *     summary: Видалити статтю
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Стаття видалена
 */
router.delete("/articles/:id", (req, res) => res.json({ message: "Article deleted" }));

/**
 * @swagger
 * /admin/categories:
 *   get:
 *     summary: Отримати всі категорії
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список категорій
 */
router.get("/categories", (req, res) => res.json([]));

/**
 * @swagger
 * /admin/categories:
 *   post:
 *     summary: Створити категорію
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Категорія створена
 */
router.post("/categories", (req, res) => res.json({ message: "Category created" }));

/**
 * @swagger
 * /admin/categories/{id}:
 *   put:
 *     summary: Оновити категорію
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Категорія оновлена
 */
router.put("/categories/:id", (req, res) => res.json({ message: "Category updated" }));

/**
 * @swagger
 * /admin/categories/{id}:
 *   delete:
 *     summary: Видалити категорію
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Категорія видалена
 */
router.delete("/categories/:id", (req, res) => res.json({ message: "Category deleted" }));

/**
 * @swagger
 * /admin/upload:
 *   post:
 *     summary: Завантажити зображення
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Файл завантажено
 */
router.post("/upload", (req, res) => res.json({ message: "File uploaded" }));

export default router;
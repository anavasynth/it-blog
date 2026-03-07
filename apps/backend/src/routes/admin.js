import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();
router.use(authMiddleware); // всі маршрути захищені

// Статті
router.get("/articles", (req, res) => res.json([]));           // GET /api/admin/articles — всі статті
router.post("/articles", (req, res) => res.json({ message: "Article created" })); // POST — створити
router.put("/articles/:id", (req, res) => res.json({ message: "Article updated" })); // PUT — оновити
router.delete("/articles/:id", (req, res) => res.json({ message: "Article deleted" })); // DELETE — видалити

// Категорії
router.get("/categories", (req, res) => res.json([]));          // GET /api/admin/categories — список
router.post("/categories", (req, res) => res.json({ message: "Category created" })); // POST — створити
router.put("/categories/:id", (req, res) => res.json({ message: "Category updated" })); // PUT — оновити
router.delete("/categories/:id", (req, res) => res.json({ message: "Category deleted" })); // DELETE — видалити

// Завантаження зображень
router.post("/upload", (req, res) => res.json({ message: "File uploaded" }));

export default router;
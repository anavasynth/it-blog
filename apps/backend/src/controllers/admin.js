import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();
router.use(authMiddleware);

// Mock endpoints
router.get("/articles", (req, res) => res.json([]));
router.post("/articles", (req, res) => res.json({ message: "Article created" }));
router.put("/articles/:id", (req, res) => res.json({ message: "Article updated" }));
router.delete("/articles/:id", (req, res) => res.json({ message: "Article deleted" }));

router.get("/categories", (req, res) => res.json([]));
router.post("/categories", (req, res) => res.json({ message: "Category created" }));
router.put("/categories/:id", (req, res) => res.json({ message: "Category updated" }));
router.delete("/categories/:id", (req, res) => res.json({ message: "Category deleted" }));

router.post("/upload", (req, res) => res.json({ message: "File uploaded" }));

export default router;
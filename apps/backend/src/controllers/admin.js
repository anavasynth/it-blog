import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { pool } from "../../config/db.js";

const router = Router();
router.use(authMiddleware);

// Mock endpoints
export const getArticles = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM articles ORDER BY created_at DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "DB error" });
    }
};

// Створити нову статтю
// Допоміжна функція для створення slug
const generateSlug = (title) => {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')   // прибрати спецсимволи
        .replace(/\s+/g, '-')       // пробіли → дефіс
        .replace(/--+/g, '-');      // подвійні дефіси → один
};

export const createArticle = async (req, res) => {
    const { title, content, excerpt, cover_url, author_id, category_id, status, meta_title, meta_description, published_at } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required" });
    }

    const slug = generateSlug(title);

    try {
        const result = await pool.query(
            `INSERT INTO articles 
            (title, slug, content, excerpt, cover_url, author_id, category_id, status, meta_title, meta_description, published_at)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
            RETURNING *`,
            [title, slug, content, excerpt || null, cover_url || null, author_id, category_id || null, status || "draft", meta_title || null, meta_description || null, published_at || null]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "DB error" });
    }
};

// Оновлення статті
export const updateArticle = async (req, res) => {
    const { id } = req.params;
    const { title, content, excerpt, cover_url, author_id, category_id, status, meta_title, meta_description, published_at } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required" });
    }

    const slug = generateSlug(title);

    try {
        const result = await pool.query(
            `UPDATE articles
             SET title=$1, slug=$2, content=$3, excerpt=$4, cover_url=$5, author_id=$6, category_id=$7, status=$8, meta_title=$9, meta_description=$10, published_at=$11, updated_at=NOW()
             WHERE id=$12
             RETURNING *`,
            [title, slug, content, excerpt || null, cover_url || null, author_id, category_id || null, status || "draft", meta_title || null, meta_description || null, published_at || null, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Article not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "DB error" });
    }
};

// Видалення статті
export const deleteArticle = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            `DELETE FROM articles WHERE id=$1 RETURNING *`,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Article not found" });
        }

        res.json({ message: "Article deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "DB error" });
    }
};

router.get("/categories", (req, res) => res.json([]));
router.post("/categories", (req, res) => res.json({ message: "Category created" }));
router.put("/categories/:id", (req, res) => res.json({ message: "Category updated" }));
router.delete("/categories/:id", (req, res) => res.json({ message: "Category deleted" }));

router.post("/upload", (req, res) => res.json({ message: "File uploaded" }));

export default router;
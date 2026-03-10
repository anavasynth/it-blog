import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { pool } from "../../config/db.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = Router();
router.use(authMiddleware);

// Дозволені MIME типи
const allowedMimeTypes = ["image/webp", "image/avif"];

// Налаштування multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = "uploads/articles";
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Перевірка типу файлу
const fileFilter = (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only WebP and AVIF images are allowed"), false);
    }
};

export const upload = multer({ storage, fileFilter });

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

// Створення статті
export const createArticle = async (req, res) => {
    try {
        const { title, content, excerpt, author_id, category_id, status, meta_title, meta_description, published_at } = req.body;
        const cover_url = req.file ? `/uploads/articles/${req.file.filename}` : null;

        if (!title || !content) return res.status(400).json({ error: "Title and content are required" });

        const slug = generateSlug(title);

        const result = await pool.query(
            `INSERT INTO articles
             (title, slug, content, excerpt, cover_url, author_id, category_id, status, meta_title, meta_description, published_at)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
             RETURNING *`,
            [title, slug, content, excerpt || null, cover_url, author_id || null, category_id || null, status || "draft", meta_title || null, meta_description || null, published_at || null]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message || "DB error" });
    }
};

// Оновлення статті
export const updateArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, excerpt, author_id, category_id, status, meta_title, meta_description, published_at } = req.body;
        const cover_url = req.file ? `/uploads/articles/${req.file.filename}` : null;

        if (!title || !content) return res.status(400).json({ error: "Title and content are required" });

        const slug = generateSlug(title);

        // Динамічне формування полів
        const fields = [
            "title", "slug", "content", "excerpt", "author_id",
            "category_id", "status", "meta_title", "meta_description", "published_at"
        ];
        const values = [title, slug, content, excerpt || null, author_id || null, category_id || null, status || "draft", meta_title || null, meta_description || null, published_at || null];

        if (cover_url) {
            fields.push("cover_url");
            values.push(cover_url);
        }

        fields.push("updated_at");
        values.push(new Date());

        const setString = fields.map((f, i) => `${f}=$${i + 1}`).join(", ");
        values.push(id);

        const result = await pool.query(
            `UPDATE articles SET ${setString} WHERE id=$${values.length} RETURNING *`,
            values
        );

        if (result.rowCount === 0) return res.status(404).json({ error: "Article not found" });

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message || "DB error" });
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

// Отримати всі категорії
export const getCategories = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM categories ORDER BY created_at DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "DB error" });
    }
};

// Створити нову категорію
export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) return res.status(400).json({ error: "Name is required" });

        const slug = generateSlug(name);

        const result = await pool.query(
            `INSERT INTO categories (name, slug, description)
             VALUES ($1, $2, $3)
                 RETURNING *`,
            [name, slug, description || null]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        if (err.code === "23505") { // duplicate key
            res.status(400).json({ error: "Category with this slug already exists" });
        } else {
            res.status(500).json({ error: "DB error" });
        }
    }
};

// Оновити категорію
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        if (!name) return res.status(400).json({ error: "Name is required" });

        const slug = generateSlug(name);

        const result = await pool.query(
            `UPDATE categories
             SET name = $1,
                 slug = $2,
                 description = $3
             WHERE id = $4
             RETURNING *`,
            [name, slug, description || null, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Category not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        if (err.code === "23505") { // duplicate slug
            res.status(400).json({ error: "Category with this slug already exists" });
        } else {
            res.status(500).json({ error: "DB error" });
        }
    }
};

// Видалити категорію
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM categories WHERE id = $1 RETURNING *", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Category not found" });
        }

        res.json({ message: "Category deleted", category: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "DB error" });
    }
};

router.post("/upload", (req, res) => res.json({ message: "File uploaded" }));

export default router;
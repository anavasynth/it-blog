import { pool } from "../../config/db.js";

// Отримати всі категорії
export const getCategories = async (req, res) => {
    try {

        const result = await pool.query(
            "SELECT id, name, slug, description, created_at FROM categories ORDER BY name"
        );

        res.json(result.rows);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "DB error" });
    }
};


// Отримати статті по категорії
export const getArticlesByCategory = async (req, res) => {
    const { slug } = req.params;

    try {

        const result = await pool.query(
            `SELECT a.*
             FROM articles a
             JOIN categories c ON a.category_id = c.id
             WHERE c.slug = $1
             AND a.status = 'published'
             ORDER BY a.published_at DESC`,
            [slug]
        );

        res.json(result.rows);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "DB error" });
    }
};
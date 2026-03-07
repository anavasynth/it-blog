import { categories } from "../models/categories.js";
import { articles } from "../models/articles.js";

export const getCategories = (req, res) => res.json(categories);

export const getArticlesByCategory = (req, res) => {
    const category = categories.find(c => c.slug === req.params.slug);
    if (!category) return res.status(404).json({ error: "Not found" });
    const categoryArticles = articles.filter(a => a.category === category.slug);
    res.json(categoryArticles);
};
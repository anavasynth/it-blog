import { tags } from "../models/tags.js";
import { articles } from "../models/articles.js";

export const getTags = (req, res) => res.json(tags);

export const getArticlesByTag = (req, res) => {
    const tag = tags.find(t => t.slug === req.params.slug);
    if (!tag) return res.status(404).json({ error: "Not found" });
    const taggedArticles = articles.filter(a => a.tags.includes(tag.slug));
    res.json(taggedArticles);
};
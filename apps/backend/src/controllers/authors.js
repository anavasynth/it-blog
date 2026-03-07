import { authors } from "../models/authors.js";
import { articles } from "../models/articles.js";

export const getAuthorBySlug = (req, res) => {
    const author = authors.find(a => a.slug === req.params.slug);
    if (!author) return res.status(404).json({ error: "Not found" });
    res.json(author);
};

export const getArticlesByAuthor = (req, res) => {
    const author = authors.find(a => a.slug === req.params.slug);
    if (!author) return res.status(404).json({ error: "Not found" });
    const authorArticles = articles.filter(a => a.author === author.slug);
    res.json(authorArticles);
};
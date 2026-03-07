import { articles } from "../models/articles.js";

export const getArticles = (req, res) => res.json(articles);

export const getArticleBySlug = (req, res) => {
    const article = articles.find(a => a.slug === req.params.slug);
    if (!article) return res.status(404).json({ error: "Not found" });
    res.json(article);
};

export const getRelatedArticles = (req, res) => {
    const article = articles.find(a => a.slug === req.params.slug);
    if (!article) return res.status(404).json({ error: "Not found" });
    const related = articles.filter(a => a.category === article.category && a.slug !== article.slug);
    res.json(related);
};

export const incrementViews = (req, res) => {
    const article = articles.find(a => a.id === parseInt(req.params.id));
    if (!article) return res.status(404).json({ error: "Not found" });
    article.views += 1;
    res.json({ views: article.views });
};
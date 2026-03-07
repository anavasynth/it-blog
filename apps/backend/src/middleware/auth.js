import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token" });

    try {
        // Присвоюємо одразу в req.user, без проміжної змінної
        req.user = jwt.verify(token, process.env.JWT_SECRET || "secret");
        next();
    } catch {
        res.status(401).json({ error: "Invalid token" });
    }
};
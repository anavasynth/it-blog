import jwt from "jsonwebtoken";

// mock користувачі
const users = [
    { id: 1, username: "admin", password: "1234" },
];

export const login = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
    res.json({ token });
};

export const logout = (req, res) => {
    // просто можна фронту повідомити, що треба видалити токен
    res.json({ message: "Logged out" });
};
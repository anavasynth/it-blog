import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/news", (req, res) => {
    res.json([
        { id: 1, title: "First IT News" },
        { id: 2, title: "Second IT News" }
    ]);
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
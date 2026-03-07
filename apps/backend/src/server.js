import express from "express";
import cors from "cors";
import { setupSwagger } from "./swagger.js";

import articlesRouter from "./routes/articles.js";
import categoriesRouter from "./routes/categories.js";
import authorsRouter from "./routes/authors.js";
import tagsRouter from "./routes/tags.js";
import adminRouter from "./routes/admin.js";
import authRouter from "./routes/auth.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/articles", articlesRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/tags", tagsRouter);
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);

// Swagger
setupSwagger(app);

app.listen(5000, () => console.log("Backend mock running on port 5000"));
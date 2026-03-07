// swagger.js
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "IT Blog API",
            version: "1.0.0",
            description: "Документація для публічних та адмінських ендпоінтів",
        },
        servers: [{ url: "http://localhost:5000/api" }],
    },
    // Важливо: вказати всі файли з роутами відносно місця запуску
    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
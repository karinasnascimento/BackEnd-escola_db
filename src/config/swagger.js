import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sistema Escola API",
      version: "1.0.0",
      description: "API REST para gerenciamento de escola: alunos, professores, turmas, disciplinas e notas.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local"
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Informe o token JWT obtido em /auth/login. Exemplo: Bearer SEU_TOKEN"
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

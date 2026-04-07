import type { FastifyInstance } from "fastify";
import { CarController } from "./cars.controllers.js";
import { createCarSchema, searchCarSchema } from "./cars.schema.js";
import { CarRepository } from "./repository/cars.repository.js";
import { db } from "../../infra/database/client.js";

export const carRoutes = (app: FastifyInstance) => {
  const repo = new CarRepository(db);
  const controller = new CarController(repo);

  app.get("/", controller.getAll.bind(controller));

  app.post(
    "/",
    {
      schema: {
        body: createCarSchema,
      },
    },
    controller.create.bind(controller),
  );

  app.post(
    "/search",
    {
      schema: {
        body: searchCarSchema,
      },
    },
    controller.searchCars.bind(controller),
  );
};

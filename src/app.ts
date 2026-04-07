import type { ZodTypeProvider } from "fastify-type-provider-zod";
import fastify from "fastify";
import cors from "@fastify/cors";
import { carRoutes } from "./modules/cars/cars.routes.js";

export const buildApp = async () => {
  const app = fastify();

  await app.register(cors, { origin: true });

  app.register(carRoutes, { prefix: "/cars" });

  return app.withTypeProvider<ZodTypeProvider>();
};

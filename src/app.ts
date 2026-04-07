import type { ZodTypeProvider } from "fastify-type-provider-zod";
import fastify from "fastify";
import cors from "@fastify/cors";
import { carRoutes } from "./modules/cars/cars.routes.js";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

export const buildApp = async () => {
  const app = fastify();

  await app.register(cors, { origin: true });

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(carRoutes, { prefix: "/cars" });

  return app.withTypeProvider<ZodTypeProvider>();
};

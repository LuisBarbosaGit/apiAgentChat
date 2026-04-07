import type { FastifyReply, FastifyRequest } from "fastify";
import { getAllCarsUseCase } from "./useCases/getall-car-usecase.js";
import { createCarUseCase } from "./useCases/create-car-usecase.js";
import type { createCarDTO } from "./cars.schema.js";
import { AiSearchAgent } from "./search/agent/ai-search-agent.js";
import OpenAI from "openai";
import { env } from "../../config/env.js";
import { SearchCarUseCase } from "./useCases/search-cars-usecase.js";

export class CarController {
  constructor(private repository: any) {}

  async getAll(_: FastifyRequest, reply: FastifyReply) {
    const useCase = new getAllCarsUseCase(this.repository);

    const data = await useCase.execute();

    return reply.status(200).send(data);
  }

  async create(
    request: FastifyRequest<{ Body: createCarDTO }>,
    reply: FastifyReply,
  ) {
    const useCase = new createCarUseCase(this.repository);

    const item = request.body;

    const response = await useCase.execute(item);

    return reply.status(201).send(response);
  }

  async searchCars(request: FastifyRequest, reply: FastifyReply) {
    const agent = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
    });
    const { search } = request.body as { search: string };
    const useCase = new SearchCarUseCase(this.repository, agent);

    const data = await useCase.execute(search);

    return reply.status(201).send(data);
  }
}

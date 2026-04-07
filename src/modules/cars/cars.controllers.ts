import type { FastifyReply, FastifyRequest } from "fastify";
import { getAllCarsUseCase } from "./useCases/getall-car-usecase.js";
import { createCarUseCase } from "./useCases/create-car-usecase.js";
import type { createCarChema } from "./cars.schema.js";

export class CarController {
  constructor(private repository: any) {}

  async getAll(_: FastifyRequest, reply: FastifyReply) {
    const useCase = new getAllCarsUseCase(this.repository);

    const data = await useCase.execute();

    return reply.status(204).send(data);
  }

  async create(
    request: FastifyRequest<{ Body: createCarChema }>,
    reply: FastifyReply,
  ) {
    const useCase = new createCarUseCase(this.repository);

    const item = request.body;

    await useCase.execute(item);

    return reply.status(204).send();
  }
}

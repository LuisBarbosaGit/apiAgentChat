import type { createCarChema } from "../cars.schema.js";
import type { ICarRepository } from "../repository/types.js";

export class createCarUseCase {
  constructor(private repository: ICarRepository) {}

  async execute(item: createCarChema) {
    await this.repository.create(item);
  }
}

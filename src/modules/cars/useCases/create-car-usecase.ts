import type { createCarDTO } from "../cars.schema.js";
import type { ICarRepository } from "../repository/schema.js";

export class createCarUseCase {
  constructor(private repository: ICarRepository) {}

  async execute(item: createCarDTO) {
    const data = await this.repository.create(item);
    return data;
  }
}

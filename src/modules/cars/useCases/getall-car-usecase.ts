import type { ICarRepository } from "../repository/schema.js";

export class getAllCarsUseCase {
  constructor(private repository: ICarRepository) {}

  async execute() {
    const data = await this.repository.getAll();

    return data;
  }
}

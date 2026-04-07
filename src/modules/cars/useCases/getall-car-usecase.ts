import type { ICarRepository } from "../repository/types.js";

export class getAllCarsUseCase {
  constructor(private repository: ICarRepository) {}

  async execute() {
    const data = await this.repository.getAll();

    return data;
  }
}

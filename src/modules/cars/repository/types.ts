import type { CarDTO, createCarChema } from "../cars.schema.js";

export interface ICarRepository {
  getAll(): Promise<CarDTO[] | null>;
  create(item: createCarChema): Promise<any>;
}

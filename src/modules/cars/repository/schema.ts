import type { CarDTO, createCarDTO, SearchCarFilters } from "../cars.schema.js";

export interface ICarRepository {
  getAll(): Promise<CarDTO[] | null>;
  create(item: createCarDTO): Promise<CarDTO[]>;
  filterCars(filters: SearchCarFilters): Promise<CarDTO[]>;
}

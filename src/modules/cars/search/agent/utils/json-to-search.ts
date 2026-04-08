import z from "zod";
import type { SearchCarFilters } from "../../../cars.schema.js";

const toolsArgsSchema = z.object({
  brand: z.string().trim().optional(),
  model: z.string().trim().optional(),
  version: z.string().trim().optional(),
  year: z.number().optional(),
  mileage: z.number().optional(),
});

export const jsonToSearch = (search: string): SearchCarFilters => {
  try {
    const parsedSearch = toolsArgsSchema.safeParse(
      JSON.parse(search) as unknown,
    );

    if (!parsedSearch.success) {
      return {};
    }

    const { brand, model, version, year, mileage } = parsedSearch.data;

    return {
      ...(brand ? { brand } : {}),
      ...(model ? { model } : {}),
      ...(version ? { version } : {}),
      ...(year ? { year } : {}),
      ...(mileage ? { mileage } : {}),
    };
  } catch (error) {
    return {};
  }
};

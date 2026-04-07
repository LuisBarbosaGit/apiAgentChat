import z from "zod";
import type { SearchCarFilters } from "../../../cars.schema.js";

const toolsArgsSchema = z.object({
  brand: z.string().trim().optional(),
  model: z.string().trim().optional(),
  version: z.string().trim().optional(),
});

export const jsonToSearch = (search: string): SearchCarFilters => {
  try {
    const parsedSearch = toolsArgsSchema.safeParse(JSON.parse(search) as unknown);

    if (!parsedSearch.success) {
      return {};
    }

    const { brand, model, version } = parsedSearch.data;

    return {
      ...(brand ? { brand } : {}),
      ...(model ? { model } : {}),
      ...(version ? { version } : {}),
    };
  } catch (error) {
    return {};
  }
};

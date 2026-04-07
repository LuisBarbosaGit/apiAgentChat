import OpenAI from "openai";
import type { ICarRepository } from "../../repository/schema.js";
import { env } from "../../../../config/env.js";
import { SEARCH_CARS_TOOL, TOOL_NAME } from "./tools/search-cars-tool.js";
import { jsonToSearch } from "./utils/json-to-search.js";

export class AiSearchAgent {
  constructor(
    private readonly repository: ICarRepository,
    private readonly agent: OpenAI,
  ) {}

  async execute(message: string) {
    const completion = await this.agent.chat.completions.create({
      model: env.MODEL_NAME as string,
      temperature: 1,
      messages: [
        {
          role: "system",
          content:
            '"Assistente de catálogo de veículos (português). Chame search_cars exatamente uma vez. Preencha `marca` se citar fabricante; `nome` para modelo; `versao` para motor/trim; `ano` para um ano-modelo exato (não misture com ano_min/ano_max); `ano_min` e/ou `ano_max` para intervalos de ano; `km_min` e/ou `km_max` para quilometragem em km inteiros (ex.: 50 mil → 50000). Combine campos quando fizer sentido. Só use argumentos vazios {} se a mensagem for genérica (listar tudo) sem nenhum desses critérios."',
        },
        { role: "user", content: message },
      ],
      tools: [SEARCH_CARS_TOOL],
      tool_choice: "required",
    });

    const toolCalls = completion.choices[0]?.message.tool_calls ?? [];

    const call = toolCalls.find(
      (c): c is Extract<(typeof toolCalls)[number], { type: "function" }> =>
        c.type === "function" && c.function.name === TOOL_NAME,
    );

    const filters = call ? jsonToSearch(call.function.arguments ?? "{}") : {};

    const items = await this.repository.filterCars(filters);

    return { items };
  }
}

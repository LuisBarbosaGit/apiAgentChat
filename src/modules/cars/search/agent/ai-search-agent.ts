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
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: "system",
        content:
          "Assistente de catálogo de veículos (português). Chame search_cars exatamente uma vez. Preencha `marca` se o fabricante for mencionado; `modelo` para o modelo; `versao` para motor/versão; `ano` para ano exato; `quilometragem` para quilometragem exata em km. Combine os campos quando fizer sentido. Use argumentos vazios {} apenas se a mensagem for genérica (listar tudo) sem nenhum desses critérios.",
      },
      { role: "user", content: message },
    ];
    const completion = await this.agent.chat.completions.create({
      model: env.MODEL_NAME as string,
      temperature: 1,
      messages,
      tools: [SEARCH_CARS_TOOL],
      tool_choice: "required",
    });

    const toolCalls = completion.choices[0]?.message.tool_calls ?? [];
    const aiMessage = completion.choices[0]?.message;

    const call = toolCalls.find(
      (c): c is Extract<(typeof toolCalls)[number], { type: "function" }> =>
        c.type === "function" && c.function.name === TOOL_NAME,
    );

    const filters = call ? jsonToSearch(call.function.arguments ?? "{}") : {};

    const items = await this.repository.filterCars(filters);

    const finalResponse = await this.agent.chat.completions.create({
      model: env.MODEL_NAME as string,
      temperature: 1,
      messages: [
        ...messages,
        aiMessage as OpenAI.Chat.ChatCompletionMessageParam,
        {
          role: "tool",
          tool_call_id: call?.id ?? "",
          content: JSON.stringify(items),
        },
        {
          role: "system",
          content: `
            Você é um consultor de vendas de veículos simpático e direto.
             Regras de resposta:
            - Seja conversacional, mas mantendo a formalidade
            - Não use listas com bullet points nem markdown (sem traços, asteriscos, negrito)
            - Se houver apenas um resultado, apresente-o de forma fluida em 2 ou 3 frases curtas
            - Se houver múltiplos resultados, cite os destaques de cada um em linguagem natural
            - Não finalize com uma pergunta
            - Nunca invente informações que não estejam no contexto fornecido
            - Se não houver resultados, diga de forma simpática e sugira ajustar os filtros
      `,
        },
      ],
    });

    const responseMessage = finalResponse.choices[0]?.message.content ?? "";
    return { items, message: responseMessage };
  }
}

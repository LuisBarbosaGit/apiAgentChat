import type OpenAI from "openai";

export const TOOL_NAME = "search_cars";

export const SEARCH_CARS_TOOL = {
  type: "function" as const,
  function: {
    name: TOOL_NAME,
    description:
      'Pesquise o catálogo por critérios. Preencha tudo que a pergunta deixar claro. `marca` = fabricante (BMW, Fiat). `modelo` = modelo (Gol, T-Cross). `versao` = versão ou motor quando mencionado (1.4, Comfortline). `ano` = ano exato (ex.: 2020). `quilometragem` = quilometragem exata em km (ex.: 50000). Ex.: {"marca":"BMW"}; {"modelo":"Gol","versao":"1.4"}; {"ano":2020}; {"quilometragem":50000}. Use {} apenas para requisições genéricas sem marca, modelo, versão, ano ou quilometragem (ex.: "mostre tudo").',
    parameters: {
      type: "object",
      additionalProperties: false,
      properties: {
        brand: {
          type: "string",
          description:
            "Fabricante quanto citado, inclusive sozinho, (ex: 'tem bmw?' -> BMW)",
        },
        model: {
          type: "string",
          description: "Modelo (ex.: Gol, T-Cross, 320i)",
        },
        version: {
          type: "string",
          description:
            "Versão ou motor quando citado (ex.: 1.4, 1.0 TSI, Comfortline)",
        },
        year: {
          type: "number",
          description: "Exact year (e.g.: 2020)",
        },
        mileage: {
          type: "number",
          description: "Exact mileage in km (e.g.: 50000)",
        },
      },
    },
  },
} satisfies OpenAI.ChatCompletionTool;

import type OpenAI from "openai";


export const TOOL_NAME = "search_cars";

export const SEARCH_CARS_TOOL = {
  type: "function" as const,
  function: {
    name: TOOL_NAME,
    description:
      'Consulta o catálogo por critérios. Preencha tudo o que a pergunta deixar claro. `marca` = fabricante (BMW, Fiat). `nome` = modelo (Gol, T-Cross). `versao` = motor/trim (1.4, Comfortline). `ano` = ano-modelo exato (use só um: `ano` OU `ano_min`/`ano_max`, não misture). `ano_min`/`ano_max` = faixa ("de 2018 a 2020", "a partir de 2019"). `km_min`/`km_max` = quilometragem em km inteiros ("50 mil km" → km_max: 50000; "acima de 100 mil" → km_min: 100000). Ex.: {"marca":"BMW"}; {"nome":"Gol","versao":"1.4"}; {"ano":2020}; {"ano_min":2018,"ano_max":2020}; {"km_max":50000}. Use {} só para pedidos genéricos sem marca, modelo, versão, ano nem km (ex.: "mostre tudo").',
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
      },
    },
  },
} satisfies OpenAI.ChatCompletionTool;

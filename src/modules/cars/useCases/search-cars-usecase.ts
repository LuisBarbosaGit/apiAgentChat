import type OpenAI from "openai";
import type { ICarRepository } from "../repository/schema.js";
import { AiSearchAgent } from "../search/agent/ai-search-agent.js";

export class SearchCarUseCase {
  constructor(
    private readonly repository: ICarRepository,
    private readonly agent: OpenAI,
  ) {}

  async execute(query: string) {
    const searchAgent = new AiSearchAgent(this.repository, this.agent);

    const response = await searchAgent.execute(query);

    return response;
  }
}

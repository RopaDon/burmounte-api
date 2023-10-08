import "reflect-metadata";

import { injectable } from "inversify";
import { NewsArticle } from "../types";
import { HttpClient } from "../http/client";
import { snakeToCamel } from "../utils";

@injectable()
export class NewsApi {
  private readonly httpClient: HttpClient;

  constructor() {
    const headers = {};

    this.httpClient = new HttpClient(process.env.NEWS_API!, headers);
  }

  async searchNews(query: string, limit: number = 10): Promise<NewsArticle[]> {
    try {
      const response = await this.httpClient.get<any>(``, {
        params: {
          search: query,
          limit,
        },
      });

      const responseData = response.data.map(snakeToCamel);

      return responseData;
    } catch (error) {
      return [];
    }
  }
}

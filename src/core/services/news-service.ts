import { injectable } from "inversify";
import { NewsArticle } from "../types";
import { HttpClient } from "../http/client";
import { snakeToCamelCase } from "../utils";

@injectable()
export class NewsApi {
  private readonly httpClient: HttpClient;

  constructor() {
    const headers = {};

    this.httpClient = new HttpClient(process.env.NEWS_API!, headers);
  }

  async searchNews(query: string, limit: number = 3): Promise<NewsArticle[]> {
    try {
      const response = await this.httpClient.get<any>(``, {
        params: {
          search: query,
          limit,
        },
      });
      const responseData = response.data.map((item: any) => {
        const camelCaseItem: any = {};
        for (const key in item) {
          if (Object.hasOwnProperty.call(item, key)) {
            camelCaseItem[snakeToCamelCase(key)] = item[key];
          }
        }
        return camelCaseItem;
      });

      return responseData;
    } catch (error) {
      return [];
    }
  }
}

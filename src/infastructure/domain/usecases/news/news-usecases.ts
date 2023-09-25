import { inject, injectable } from "inversify";
import { NewsArticle } from "../../../../core/types";
import { NewsApi } from "../../../../core/services/news-service";
import { HttpStatusCodes } from "../../../../core/http/status-codes";
import { GetNewsDTO } from "../../../../core/http/request/news/get-news-articles";
import ServiceHubException from "../../../../core/exceptions/service-hub-exception";

@injectable()
export default class NewsUseCases {
  constructor(@inject(NewsApi) private newsApi: NewsApi) {}

  public async getNewsArticles(getNewsDTO: GetNewsDTO): Promise<NewsArticle[]> {
    const { query, limit } = getNewsDTO;

    try {
      return await this.newsApi.searchNews(query, limit);
    } catch (e) {
      throw new ServiceHubException(HttpStatusCodes.BAD_REQUEST, "An error occurred");
    }
  }
}

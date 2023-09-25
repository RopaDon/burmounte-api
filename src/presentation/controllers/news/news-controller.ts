import "reflect-metadata";
import { Controllers } from "..";
import Routes from "../../routes/routes";
import { inject, injectable } from "inversify";
import { Get, JsonController, QueryParams } from "routing-controllers";
import { GetNewsDTO } from "../../../core/http/request/news/get-news-articles";
import NewsUseCases from "../../../infastructure/domain/usecases/news/news-usecases";

@injectable()
@JsonController(Controllers.News)
export class NewsController {
  constructor(@inject(NewsUseCases) private newsUseCases: NewsUseCases) {}

  @Get(Routes.News.GetArticles)
  async getNewsArticles(@QueryParams() getNewsDTO: GetNewsDTO) {
    return await this.newsUseCases.getNewsArticles(getNewsDTO);
  }
}

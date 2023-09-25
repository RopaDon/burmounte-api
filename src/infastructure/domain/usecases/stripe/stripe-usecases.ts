import Stripe from "stripe";
import { inject, injectable } from "inversify";
import stripe from "../../../../core/modules/stripe";
import { DerivUser, NewsArticle } from "../../../../core/types";
import { HttpStatusCodes } from "../../../../core/http/status-codes";
import { GetNewsDTO } from "../../../../core/http/request/news/get-news-articles";
import ServiceHubException from "../../../../core/exceptions/service-hub-exception";

@injectable()
export default class StripeUseCases {
  constructor() {}

  public async createStripeCustomer(user: DerivUser): Promise<Stripe.Response<Stripe.Customer>> {
    const { email, full_name: name, country } = user;

    try {
      const customer = await stripe.customers.create({ email, name, address: { country } });

      return customer;
    } catch (e) {
      throw new ServiceHubException(HttpStatusCodes.BAD_REQUEST, "Stripe Error: Unable to create a new customer in Stripe.");
    }
  }
}

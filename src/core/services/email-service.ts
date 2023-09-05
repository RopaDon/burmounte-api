// ConfigService.ts
import "reflect-metadata";

import fs from "fs";
import ejs from "ejs";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { injectable } from "inversify";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import { RequestPartnershipDTO } from "../http/request/service/request-partnership-dto";

dotenv.config();

@injectable()
export class EmailService {
  constructor() {}


}

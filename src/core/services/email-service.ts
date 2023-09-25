// ConfigService.ts
import "reflect-metadata";

import fs from "fs";
import ejs from "ejs";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { injectable } from "inversify";

dotenv.config();

@injectable()
export class EmailService {
  constructor() {}
}

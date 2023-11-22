(global as any).WebSocket = require("ws");

import fs from "fs";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { container } from "./core/di/dependency-injection";
import { derivAPI } from "./core/services/deriv-api-connection";
import { routingControllersToSpec } from "routing-controllers-openapi";
import AuthorizationMiddleware from "./core/http/middlewares/authorization-middleware";
import { createExpressServer, getMetadataArgsStorage, useContainer } from "routing-controllers";

async function _bootstrap() {
  const app = _configureExpressServer();

  _configureServices(app);

  //_configureSwagger(app);
}

function _configureExpressServer() {
  return createExpressServer({
    cors: {
      origin: "*",
    },
    validation: true,
    routePrefix: "/v1",
    defaultErrorHandler: false,
    development: process.env.NODE_ENV === "development",
    authorizationChecker: AuthorizationMiddleware.authorize,
    currentUserChecker: AuthorizationMiddleware.currentUserChecker,
    middlewares: [path.join(__dirname, "core/http/middlewares/**/*.{js,ts}")],
    interceptors: [path.join(__dirname, "core/http/interceptors/**/*.{js,ts}")],
    controllers: [path.join(__dirname, "presentation/controllers/**/*.{js,ts}")],
  }) as express.Express;
}

async function _configureServices(app: express.Express) {
  const port = process.env.PORT || 5000;

  derivAPI.connect();

  useContainer(container, { fallback: true, fallbackOnErrors: true });

  app.use(bodyParser.json({ limit: "50mb" }));

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

function _configureSwagger(app: express.Express) {
  const options: swaggerJsdoc.Options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Burmounte Trading API",
        version: "1.0.0",
        description: "API documentation using Swagger",
      },
    },
    apis: ["./presentation/controllers/*.{js,ts}"], // Update with the path to your controller files
  };

  const specs = swaggerJsdoc(options);
  const storage = getMetadataArgsStorage();
  const spec = routingControllersToSpec(storage);

  Object.assign(specs, spec);

  app.use("/v1/swagger", swaggerUi.serve, swaggerUi.setup(specs));
}

_bootstrap();

import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import routes from "./routes/index.js";

import { errorHandler } from "./utils/error/errorHandler.js";

const app = express();

import * as cors from "cors";
app.use(cors());

app.use(helmet());

app.use(cookieParser());

app.use(express.json());

app.get("/ping", (req, res) => {
  res.status(201).json("OK!!");
});

app.use("/api", routes);

app.use("*", (req, res) => {
  res.status(404).json("Page Not Found !!!");
});

process.on("unhandledRejection", (reason) => {
  throw reason;
});

process.on("uncaughtException", (error) => {
  console.log({ error });
  errorHandler.handleError(error);
  if (!errorHandler.isTrustedError(error)) {
    process.exit(1);
  }
});

app.use(async (err, req, res, next) => {
  console.log({ err });
  if (!errorHandler.isTrustedError(err)) {
    next(err);
  }
  await errorHandler.handleError(err);
  res
    .status(errorHandler.getStatusCode(err) || 500)
    .json({ success: false, message: err.message });
});

const port = process.env.PORT || 3002;

app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}`)
);

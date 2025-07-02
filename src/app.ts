import express from "express";
import morgan from "morgan";
import cors from "cors";
import "./cronjob";
import routes from "./routes";
import * as middlewares from "./middlewares";
import MessageResponse from "./interfaces/MessageResponse";
import dotenv from "dotenv";
dotenv.config();
const app = express();

dotenv.config();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.use("/routes", routes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;

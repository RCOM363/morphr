import express from "express";
import cors from "cors";

import config from "./environment.js";
import fileRoutes from "../routes/file.routes.js";

const app = express();

app.use(
  cors({
    origin: config.CORS_ORIGIN,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/v1/file", fileRoutes);

export { app };

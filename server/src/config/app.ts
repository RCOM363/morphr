import express from "express";
import cors from "cors";

import config from "./environment.js";
import { upload } from "../middlewares/multer.middleware.js";

const app = express();

app.use(
  cors({
    origin: config.CORS_ORIGIN,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/", upload.array("files"), async (req, res) => {
  console.log(req.files);
  res.status(204);
});

export { app };

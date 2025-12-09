import dotenv from "dotenv";
import * as z from "zod";

import type { Environment } from "./environment.types.js";
import { environmentSchema } from "./environment.schema.js";

dotenv.config();

let typedEnvironment = {};

const env = process.env;

const { data, error } = z.safeParse(environmentSchema, env);

if (error) throw new Error(error.message);

export default typedEnvironment = data as Environment;

// Aqui fica as config do server

import express from "express";
import cors from "cors";
import {router} from "./routes/rotas";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

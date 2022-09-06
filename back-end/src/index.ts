import { app } from "./controller/app";
import express from "express";
import cors from "cors";
import { clientRouter } from "./business/routes/ClientRouter";



app.use(express.json());
app.use(cors());

app.use("/client", clientRouter);


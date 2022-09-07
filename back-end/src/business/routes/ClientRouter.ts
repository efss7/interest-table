import { Router } from "express";
import clientBusiness from "../../controller/ClientController";

export const clientRouter = Router();

clientRouter.post("/simulation", clientBusiness.simulation);
clientRouter.post("/insertinbank", clientBusiness.insertInBank)
clientRouter.get("/select", clientBusiness.select)

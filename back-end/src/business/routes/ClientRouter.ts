import { Router } from "express";
import clientBusiness from "../../controller/ClientController";

export const clientRouter = Router();

clientRouter.post("/insertAndView", clientBusiness.insertAndView);

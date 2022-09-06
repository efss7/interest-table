import { Request, Response } from "express";
import clientBusiness, { ClientBusiness } from "../business/ClientBusiness";
import { ClientDto } from "../model/Client";

export class ClientController {
    constructor(private clientBusiness: ClientBusiness) { };
    insertAndView = async (req: Request, res: Response): Promise<void> => {
        const { cpf, uf, birthData, loanAmount, amountPerMonth } = req.body
        try {
            const inputs: ClientDto = { cpf, uf, birthData, loanAmount, amountPerMonth }
            const simulator = await this.clientBusiness.insertAndView(inputs)
            res.status(201).send(simulator);
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message })
        }
    }
}
export default new ClientController(clientBusiness)
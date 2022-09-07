import { Request, Response } from "express";
import clientBusiness, { ClientBusiness } from "../business/ClientBusiness";
import { ClientDto, InsertDto } from "../model/Client";

export class ClientController {
    constructor(private clientBusiness: ClientBusiness) { };
    simulation = async (req: Request, res: Response): Promise<void> => {
        const { cpf, uf, birthData, loanAmount, amountPerMonth } = req.body
        try {
            const inputs: ClientDto = { cpf, uf, birthData, loanAmount, amountPerMonth }
            const simulator = await this.clientBusiness.simulation(inputs)
            res.status(201).send(simulator);
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message })
        }
    }
    insertInBank = async (req: Request, res: Response): Promise<void> => {
        try {
            const { cpf, rate, birthData, loanAmount, amountPerMonth, infoPayment } = req.body
            const inputs: InsertDto = { cpf, rate, birthData, loanAmount, amountPerMonth }
            await this.clientBusiness.insertInBank(inputs)
            res.status(201).send("Empréstimo efetivado")
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message })
        }
    }
    select = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.clientBusiness.select()
            res.status(200).send(result)
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    }


}
export default new ClientController(clientBusiness)
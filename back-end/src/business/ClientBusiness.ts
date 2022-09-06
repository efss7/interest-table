import { ClientData } from "../data/ClientData";
import { ClientDB, ClientDto, UF } from "../model/Client";
import IdGenerator from "../services/IdGenerator";
import { CustomError } from "./errors/CustomError";

export class ClientBusiness {
    constructor(
        private clientData: ClientData,
        private idGenerator: IdGenerator
    ) { }
    insertAndView = async (inputs: ClientDto) => {
        try {
            const { cpf, uf, birthData, loanAmount, amountPerMonth } = inputs;
            const id = this.idGenerator.generateId()
            const rate = +UF[`${uf}`]
            const simulator = this.calculate(loanAmount, rate, amountPerMonth)
            const totalInterest = simulator.reduce((acc, current) => {
                acc += current.fees
                return acc
            }, 0)
            const totalPayable = loanAmount + totalInterest
            const totalTerm = simulator.length

            const dicesOfClient: ClientDB = {
                id,
                cpf,
                rate,
                birthData,
                loanAmount,
                amountPerMonth,
                infoPayment: JSON.stringify(simulator)
            };
            // await this.clientData.insert(dicesOfClient);
            return {
                loanAmount, rate: rate * 100, amountPerMonth, totalTerm, totalInterest, totalPayable, simulator
            }
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
    calculate = (loanAmount: number, rate: number, amountPerMonth: number) => {
        const calculateAmount = (loanAmount: number, rate: number, amountPerMonth: number) => {
            const balanceDue = loanAmount
            const fees = loanAmount * rate
            const debtorWithInterest = loanAmount + fees
            const pay = debtorWithInterest - (amountPerMonth < debtorWithInterest ? amountPerMonth : debtorWithInterest)
            return { balanceDue, fees, debtorWithInterest, pay }
        }

        const calculateInstallment = (loanAmount: number, rate: number, amountPerMonth: number) => {
            let balanceDue = loanAmount
            let installments = []
            while (balanceDue > 0) {
                const result = calculateAmount(balanceDue, rate, amountPerMonth)
                installments.push(result)
                balanceDue = result.pay
            }
            return installments
        }
        return calculateInstallment(loanAmount, rate, amountPerMonth)

        const calculateMonths = () =>{}
    }
}
export default new ClientBusiness(
    new ClientData(),
    new IdGenerator()
);
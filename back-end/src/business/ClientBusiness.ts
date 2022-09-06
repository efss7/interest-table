import { ClientData } from "../data/ClientData";
import { ClientDto, InsertDB, InsertDto, UF } from "../model/Client";
import IdGenerator from "../services/IdGenerator";
import { CustomError } from "./errors/CustomError";

export class ClientBusiness {
    constructor(
        private clientData: ClientData,
        private idGenerator: IdGenerator
    ) { }
    simulation = async (inputs: ClientDto) => {
        try {
            const {  uf, loanAmount, amountPerMonth } = inputs;
            const rate = +UF[`${uf}`]
            const simulator = this.calculate(loanAmount, rate, amountPerMonth)
            const totalInterest = simulator.reduce((acc, current) => {
                acc += current.fees
                return acc
            }, 0)
            const totalPayable = loanAmount + totalInterest
            const totalTerm = simulator.length
            return {
                loanAmount, rate: rate * 100, amountPerMonth, totalTerm, totalInterest, totalPayable, simulator
            }
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
    private calculate = (loanAmount: number, rate: number, amountPerMonth: number) => {
        const calculateAmount = (loanAmount: number, rate: number, amountPerMonth: number, month: number) => {
            const balanceDue = loanAmount
            const fees = loanAmount * rate
            const debtorWithInterest = loanAmount + fees
            const pay = debtorWithInterest - (amountPerMonth < debtorWithInterest ? amountPerMonth : debtorWithInterest)
            let date = new Date()
            date.setMonth(date.getMonth() + month)
            let newDate = date.toISOString().slice(0, 10).split('-').reverse().join('/')
            return { 
                balanceDue,
                fees,
                debtorWithInterest,
                pay,
                date: newDate}
        }

        const calculateInstallment = (loanAmount: number, rate: number, amountPerMonth: number) => {
            let balanceDue = loanAmount
            let installments = []
            let month = 0
            while (balanceDue > 0) {
                const result = calculateAmount(balanceDue, rate, amountPerMonth, month)
                installments.push(result)
                balanceDue = result.pay
                month++ 
            }

            return installments

        }
        return calculateInstallment(loanAmount, rate, amountPerMonth)

        
    }
    insertInBank= async(inputs:InsertDto) => {
        try {
            const { cpf, rate, birthData, loanAmount, amountPerMonth, infoPayment } = inputs;
            const id = this.idGenerator.generateId()
            const dicesOfClient: InsertDB = {
                id,
                cpf,
                rate,
                birthData,
                loanAmount,
                amountPerMonth,
                infoPayment: JSON.stringify(infoPayment)
            };
            await this.clientData.simulation(dicesOfClient);
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
            
    }
}
export default new ClientBusiness(
    new ClientData(),
    new IdGenerator()
);


// Formata para reais 

// toLocaleString('pt-br', {
//     style: 'currency', currency: 'BRL'
// }),

// const test = installments.map((formatMoney) => {
//     Object.values(formatMoney).forEach((prop) => {
//         if (typeof (prop) === "number") {
//             prop.toLocaleString('pt-br', {
//                 style: 'currency', currency: 'BRL'
//             })
//             console.log(prop)
//             return prop;
//         }
//     })
// })
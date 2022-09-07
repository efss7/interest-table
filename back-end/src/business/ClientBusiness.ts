import { ClientData } from "../data/ClientData";
import { ClientDto, ClientDB, InsertDto, UF } from "../model/Client";
import IdGenerator from "../services/IdGenerator";
import { CustomError } from "./errors/CustomError";

export class ClientBusiness {
    constructor(
        private clientData: ClientData,
        private idGenerator: IdGenerator
    ) { }
    simulation = async (inputs: ClientDto) => {
        try {
            const { birthData, cpf, uf, loanAmount, amountPerMonth } = inputs;
            console.log(cpf, this.checkCPFFormat(cpf))
            if (!cpf || !this.checkCPFFormat(cpf)){
                throw new CustomError(422, "CPF inválido");
            }
            if (!birthData){
                throw new CustomError(422, "Data de nascimento não foi passada")
            }
            if(!uf){
                throw new CustomError(422, "Estado não foi passado")
            }
            if (!loanAmount || loanAmount < 50000){
                throw new CustomError(422, "Valor do empréstimo inválido")
            }
            if (!amountPerMonth || amountPerMonth < (loanAmount * 0.01)){
                throw new CustomError(422, "Valor de parcela inválido")
            }
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
    private checkCPFFormat = (cpf: string): boolean => {
        const cpfValid = /^\d{3}.\d{3}.\d{3}-\d{2}$/
        return cpfValid.test(cpf)
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
            const { cpf, rate, birthData, loanAmount, amountPerMonth } = inputs;
            if (!cpf || !this.checkCPFFormat(cpf)) {
                throw new CustomError(422, "CPF inválido");
            }
            if (!birthData) {
                throw new CustomError(422, "Data de nascimento não foi passada")
            }
            if (!rate) {
                throw new CustomError(422, "Taxa não foi passado")
            }
            if (!loanAmount || loanAmount < 50000) {
                throw new CustomError(422, "Valor do empréstimo inválido")
            }
            if (!amountPerMonth || amountPerMonth < (loanAmount * 0.01)) {
                throw new CustomError(422, "Valor de parcela inválido")
            }
            const id = this.idGenerator.generateId()
            const dicesOfClient: ClientDB = {
                id,
                cpf,
                rate,
                birthData,
                loanAmount,
                amountPerMonth,
            };
            await this.clientData.simulation(dicesOfClient);
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
            
    }
    select = async (): Promise<ClientDB[] | undefined> => {
        try {
            return this.clientData.select();
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    };
}
export default new ClientBusiness(
    new ClientData(),
    new IdGenerator()
);

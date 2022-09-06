export enum UF {
    MG = 0.01,
    SP = 0.008,
    RJ = 0.009,
    ES = 0.011
}
export class Client {
    constructor(
        private id: string,
        private cpf: string,
        private rate: UF,
        private birthData: string,
        private loanAmount: number,
        private amountPerMonth: number,
        private infoPayment: string
    ) { }
}

export interface ClientDto {
    cpf: string;
    uf: UF;
    birthData: string;
    loanAmount: number;
    amountPerMonth: number
}
export interface InsertDB {
    id: string;
    cpf: string;
    rate: UF;
    birthData: string;
    loanAmount: number;
    amountPerMonth: number;
    infoPayment: string;
}

export interface InsertDto{
    cpf: string,
    rate: UF,
    birthData:string,
    loanAmount: number,
    amountPerMonth: number,
    infoPayment: string
}
import { ClientBusiness } from "../src/business/ClientBusiness";
import { UF } from "../src/model/Client";
import { ClientDataMock } from "./mock/ClientDataMock";
import IdGeneratorMock from "./mock/IdGeneratorMock";

const ClientBusinessMock = new ClientBusiness(
    new ClientDataMock(),
    new IdGeneratorMock(),
);

const inputSimulation = {
    id: "client1",
    cpf: "798.798.048-70",
    uf: UF.MG as any ,
    birthData: "31/07/2002",
    loanAmount: 75000,
    amountPerMonth: 15000
}
const inputInsert={
    id: "client2",
    cpf: "798.798.048-70",
    rate: 0.01,
    birthData: "31/07/2002",
    loanAmount: 75000,
    amountPerMonth: 15000
}

describe("test ClientBusiness class", () => {
    describe("test simulation", () => {
        test("test missing CPF", async () => {
            inputSimulation.cpf = "";
            try {
                await ClientBusinessMock.simulation(inputSimulation);
            } catch (error: any) {
                inputSimulation.cpf = "798.798.048-70";
                expect(error.message).toEqual("CPF inválido");
                expect(error.statusCode).toStrictEqual(422);
            } finally {
                expect.assertions(2);

            }
        })
        test("test missing UF", async () => {
            inputSimulation.uf = ""
            try {
                await ClientBusinessMock.simulation(inputSimulation);
            } catch (error: any) {
                inputSimulation.uf = UF.MG;
                expect(error.message).toEqual("Estado não foi passado");
                expect(error.statusCode).toStrictEqual(422);
            } finally {
                expect.assertions(2);

            }
        })
        test("test missing birthData", async () => {
            inputSimulation.birthData = "";
            try {
                await ClientBusinessMock.simulation(inputSimulation);
            } catch (error: any) {
                inputSimulation.birthData = "31/07/2002";
                expect(error.message).toEqual("Data de nascimento não foi passada");
                expect(error.statusCode).toStrictEqual(422);
            } finally {
                expect.assertions(2);

            }
        })
        test("test missing loanAmount", async () => {
            inputSimulation.loanAmount = 0;
            try {
                await ClientBusinessMock.simulation(inputSimulation);
            } catch (error: any) {
                inputSimulation.loanAmount = 75000;
                expect(error.message).toEqual("Valor do empréstimo inválido");
                expect(error.statusCode).toStrictEqual(422);
            } finally {
                expect.assertions(2);

            }
        })
        test("test missing amountPerMonth", async () => {
            inputSimulation.amountPerMonth = 0;
            try {
                await ClientBusinessMock.simulation(inputSimulation);
            } catch (error: any) {
                inputSimulation.amountPerMonth = 15000;
                expect(error.message).toEqual("Valor de parcela inválido");
                expect(error.statusCode).toStrictEqual(422);
            } finally {
                expect.assertions(2);

            }
        })
    })

    describe("test insertInBank class", () => {
        test("test missing CPF", async () => {
            inputInsert.cpf = "";
            try {
                await ClientBusinessMock.insertInBank(inputInsert);
            } catch (error: any) {
                inputInsert.cpf = "798.798.048-70";
                expect(error.message).toEqual("CPF inválido");
                expect(error.statusCode).toStrictEqual(422);
            } finally {
                expect.assertions(2);

            }
        })
        test("test missing rate", async () => {
            inputInsert.rate = 0
            try {
                await ClientBusinessMock.insertInBank(inputInsert);
            } catch (error: any) {
                inputInsert.rate = 0.01;
                expect(error.message).toEqual("Taxa não foi passado");
                expect(error.statusCode).toStrictEqual(422);
            } finally {
                expect.assertions(2);

            }
        })
        test("test missing birthData", async () => {
            inputInsert.birthData = "";
            try {
                await ClientBusinessMock.insertInBank(inputInsert);
            } catch (error: any) {
                inputInsert.birthData = "31/07/2002";
                expect(error.message).toEqual("Data de nascimento não foi passada");
                expect(error.statusCode).toStrictEqual(422);
            } finally {
                expect.assertions(2);

            }
        })
        test("test missing loanAmount", async () => {
            inputInsert.loanAmount = 0;
            try {
                await ClientBusinessMock.insertInBank(inputInsert);
            } catch (error: any) {
                inputInsert.loanAmount = 75000;
                expect(error.message).toEqual("Valor do empréstimo inválido");
                expect(error.statusCode).toStrictEqual(422);
            } finally {
                expect.assertions(2);

            }
        })
        test("test missing amountPerMonth", async () => {
            inputInsert.amountPerMonth = 0;
            try {
                await ClientBusinessMock.insertInBank(inputInsert);
            } catch (error: any) {
                inputInsert.amountPerMonth = 15000;
                expect(error.message).toEqual("Valor de parcela inválido");
                expect(error.statusCode).toStrictEqual(422);
            } finally {
                expect.assertions(2);

            }
        })
    })
    
})
import { CustomError } from "../business/errors/CustomError";
import { ClientDB } from "../model/Client";
import BaseDatabase from "./BaseDatabase";

export class ClientData extends BaseDatabase {
    simulation = async (input: ClientDB): Promise<ClientDB> => {
        try {
            await BaseDatabase.connection("interest_table")
                .insert(input)
                return input
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage);
        }
    };
    select = async (): Promise<ClientDB[]> => {
        try {
            return BaseDatabase.connection("interest_table")
                .select("*")
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage);
        }
    }
}
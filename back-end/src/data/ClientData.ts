import { CustomError } from "../business/errors/CustomError";
import { InsertDB } from "../model/Client";
import BaseDatabase from "./BaseDatabase";

export class ClientData extends BaseDatabase {
    simulation = async (input: InsertDB): Promise<InsertDB> => {
        try {
            await BaseDatabase.connection("interest_table")
                .insert(input)
                return input
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage);
        }
    };
}
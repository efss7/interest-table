import { ClientDB} from "../../src/model/Client";
import { clientMock } from "./ClientMock";

export class ClientDataMock {
    simulation = async (input: ClientDB): Promise<ClientDB> => {
        return input
     };
    select = async (): Promise<ClientDB[]> => [clientMock];
}
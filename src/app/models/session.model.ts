import { Account } from "./account.model";

export class Session {
    _id?: string;
    user?: Account;
    token: string = "";
}

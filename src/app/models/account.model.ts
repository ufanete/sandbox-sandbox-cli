
export class Account {
    _id?: string | undefined;
    firstname: string = "";
    lastname: string = "";
    nickname: string = "";
    email: string = "";
    password: string = "";
    password_conf?: string | undefined;
    token?: string | undefined;
}

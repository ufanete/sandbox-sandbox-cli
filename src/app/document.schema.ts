export interface Account {
  _id?: string;
  firstname: string;
  lastname: string;
  nickname: string;
  email: string;
  password: string;
  password_conf?: string;
  token?: string;
}
export class AccountObject implements Account {
  _id?: string | undefined;
  firstname: string = "";
  lastname: string = "";
  nickname: string ="";
  email: string = "";
  password: string = "";
  password_conf?: string | undefined;
  token?: string | undefined;
}

export class User {
  _id?: string;
  username: string="";
  email: string="";
}

export class Post {
  _id?: string;
  src: string="";
  date: string="";
  style: any={"background":""};
}

export interface JwtToken {
  isSignedIn: boolean;
}
export class JwtTokenObject implements JwtToken {
  isSignedIn: boolean = false;
}
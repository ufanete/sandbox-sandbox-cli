export interface Account {
  _id?: string;
  username: string;
  email: string;
  password: string;
  password_conf?: string;
  token?: string;
}

export interface User {
  _id?: string;
  username: string;
  email: string;
  password: string;
  password_conf?: string;
  token?: string;
}

export interface Post {
  _id?: string;
  username: string;
  email: string;
  password: string;
  password_conf?: string;
}
  
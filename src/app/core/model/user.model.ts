// user model type

export interface User {
  id: string;
  uname: string;
  join_at: string;
  email: string;
  avatar: string;
  intro: string;
  location: string;
  nickname: string;
}

export interface AuthUser {
  status: number;
  message: string;
  token: string;
  exp: number;
  user: User;
}

export interface Auth {
  uname: string;
  [index: string]: string;  // password, comfirm
}

// rut model, type

export interface Rut {
  id: string;
  title: string;
  url: string;
  content: string;
  create_at: string;
  renew_at: string;
  author: string;
  uname: string;
  credential: string;
  logo: string;
  item_count: number;
  comment_count: number;
  star_count: number;
  vote: number;
}

export interface NewRut {
  title: string;
  url: string;
  content: string;
  uname: string;
  author_id: string;
  credential: string;
}

export interface RutRes {
  status: number;
  msg: string;
  rut: Rut;
}

export interface RutListRes {
  status: number;
  msg: string;
  ruts: Rut[];
  count: number;
}
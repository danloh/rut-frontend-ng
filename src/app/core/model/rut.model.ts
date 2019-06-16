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
  slug: string;
}

export interface NewRut {
  title: string;
  url: string;
  content: string;
  uname: string;
  author: string;
  credential: string;
}

export interface UpdateRut {
  id: string;
  uname: string; // just a placeholder
  title: string;
  url: string;
  content: string;
  author: string;
  credential: string;
}

export interface RutRes {
  status: number;
  message: string;
  rut: Rut;
}

export interface RutListRes {
  status: number;
  message: string;
  ruts: Rut[];
  count: number;
}
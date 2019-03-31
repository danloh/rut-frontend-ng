// rut model, type

export interface Rut {
  id: string;
  title: string;
  url: string;
  content: string;
  create_at: string;
  renew_at: string;
  author_id: string;
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

export interface UpdateRut {
  id: string;
  title: string;
  url: string;
  content: string;
  author_id: string;
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
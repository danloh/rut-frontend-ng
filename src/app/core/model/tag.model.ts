// tag model, type

export interface Tag {
  id: string;
  tname: string;
  intro: string;
  logo: string;
  pname: string;
  item_count: number;
  rut_count: number;
  etc_count: number;
  star_count: number;
  vote: number;
}

export interface TagRes {
  status: number;
  msg: string;
  tag: Tag;
}

export interface TagListRes {
  status: number;
  msg: string;
  tags: Tag[];
  count: number;
}

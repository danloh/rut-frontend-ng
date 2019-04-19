// item model, type

export interface Item {
  id: string;
  title: string;
  uiid: string;
  authors: string;
  pub_at: string;
  publisher: string;
  category: string;
  url: string;
  cover: string;
  edition: string;
  detail: string;
  rut_count: number;
  etc_count: number;
  done_count: number;
  vote: number;
  slug: string; 
}

export interface NewItem {
  title: string;
  uiid: string;
  authors: string;
  pub_at: string;
  publisher: string;
  category: string;
  url: string;
  cover: string;
  edition: string;
  detail: string;
}

export interface UpdateItem {
  id: string;
  title: string;
  uiid: string;
  authors: string;
  pub_at: string;
  publisher: string;
  category: string;
  url: string;
  cover: string;
  edition: string;
  detail: string;
}

export interface ItemRes {
  status: number;
  message: string;
  item: Item;
}

export interface ItemListRes {
  status: number;
  message: string;
  items: Item[];
  count: number;
}

export interface Collect {
  id: string;
  rut_id: string;
  item_id: string;
  item_order: number;
  content: string;
  uname: string;
  collect_at: string;
}

export interface NewCollect {
  rut_id: string;
  item_id: string;
  item_order: number;
  content: string;
  uname: string;
}

export interface UpdateCollect {
  id: string;
  content: string;
  uname: string;
}

export interface CollectsRes {
  status: number;
  message: string;
  collects: Collect[];
}

export interface CollectRes {
  status: number;
  message: string;
  collect: Collect;
}

export interface StarRes {
  status: number;
  message: string;
  note: string;
  when: string;
}

// core/model index
// for type model

export * from './rut.model';
export * from './item.model';
export * from './tag.model';
export * from './user.model';
export * from './error.model';

export interface MsgRes {
  status: number;
  message: string;
}

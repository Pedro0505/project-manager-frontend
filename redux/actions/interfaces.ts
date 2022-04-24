import { IBoardData, ICard } from '../../interfaces';

export interface IAction {
  type: string;
  payload: any;
}

export interface IInitialFetch extends IAction {
  payload: IBoardData;
}

export interface IEditCard extends IAction {
  payload: ICard;
}

export interface IDeleteCard extends IAction {
  payload: ICard;
}

export interface IDeleteColumn extends IAction {
  payload: string;
}

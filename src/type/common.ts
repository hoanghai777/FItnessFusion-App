export interface IContent {
  title: string;
  image: string;
  content: string;
}

export interface IFood {
  id?: string;
  name: string;
  quantity: number;
  calories: number;
  image: string;
  content: Array<IContent>;
  quantityPicked?: number;
  status?: boolean;
}

export interface IExercise {
  id?: string;
  name: string;
  image: string;
  time: string;
  content: Array<IContent>;
}

export interface INews {
  id?: string;
  name: string;
  image: string;
  subTitle: string;
  content: Array<IContent>;
}

export interface IFoodSession {
  [foodId: string]: IFood;
}

export interface ISession {
  [sessionId: string]: IFoodSession;
}

export interface IMenu {
  [dateId: string]: ISession;
}

export type IInfo = Array<IFood & IExercise & INews>;

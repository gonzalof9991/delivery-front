export interface IClient {
  id: number;
  completed: boolean;
  name: string;
  category: string;
  price: number;
  type: string;
  createdAt: string;
  deliveredAt: string;
  subcategory: string;
  delivered: boolean;
  observation?: string;
}

export interface IDialog {
  data: IClient;
  type: 'create' | 'update' | 'view';
}

export interface ICategory {
  id: number;
  name: string;
}

export interface ISubcategory {
  id: number;
  name: string;
  category_id: number;
}

export interface ISelect {
  id: number;
  name: string;
}

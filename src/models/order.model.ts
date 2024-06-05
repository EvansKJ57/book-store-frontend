import { IBook } from './book.model';

export interface IOrder {
  orderId: number;
  createdAt: string;
  address: string;
  receiver: string;
  contact: string;
  bookTitle: string;
  orderedBooks: IOrderDetail[];
  totalQty: number;
  totalPrice: number;
}

export interface IOrderSheet {
  items: number[];
  totalPrice: number;
  totalQty: number;
  firstBookTitle: string;
  delivery: IDelivery;
}

export interface IDelivery {
  address: string;
  receiver: string;
  contact: string;
}

export interface IOrderDetail
  extends Pick<IBook, 'id' | 'author' | 'price' | 'title'> {
  qty: number;
}

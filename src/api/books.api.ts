import { IBook, IBookDetail } from '../models/book.model';
import { IPagination } from '../models/pagination.model';
import { httpClient } from './http';

interface FetchBooksParams {
  pageSize: number;
  categoryId?: number;
  newBooks?: boolean;
  curPage?: number;
}

interface FetchBooksResponse {
  books: IBook[];
  pagination: IPagination;
}

export const fetchBooks = async (params: FetchBooksParams) => {
  try {
    const res = await httpClient.get<FetchBooksResponse>('/books', {
      params: params,
    });
    return res.data;
  } catch (error) {
    return {
      books: [],
      pagination: {
        totalCount: 0,
        curPage: 1,
      },
    };
  }
};

export const fetchBook = async (bookId: string) => {
  const res = await httpClient.get<IBookDetail>(`/books/${bookId}`);
  return res.data;
};

export const likeBook = async (bookId: number) => {
  const res = await httpClient.post(`/likes/${bookId}`);
  return res.data;
};

export const unlikeBook = async (bookId: number) => {
  const res = await httpClient.delete(`/likes/${bookId}`);
  return res.data;
};

export const fetchBestBooks = async () => {
  const res = await httpClient.get<IBook[]>('/books/best');
  return res.data;
};

import { IBook } from '../models/book.model';
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

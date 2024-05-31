import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IBook } from '../models/book.model';
import { IPagination } from '../models/pagination.model';
import { fetchBooks } from '../api/books.api';
import { QUERYSTRING } from '../const/querystring';
import { PAGESIZE } from '../const/pagination';

export const useBooks = () => {
  const location = useLocation();

  const [books, setBooks] = useState<IBook[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    totalCount: 0,
    curPage: 1,
  });

  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    fetchBooks({
      categoryId: params.get(QUERYSTRING.CATEGORY_ID)
        ? Number(params.get(QUERYSTRING.CATEGORY_ID))
        : undefined,
      newBooks: params.get(QUERYSTRING.NEW) ? true : undefined,
      curPage: params.get(QUERYSTRING.PAGE)
        ? Number(params.get(QUERYSTRING.PAGE))
        : 1,
      pageSize: PAGESIZE,
    }).then(({ books, pagination }) => {
      setBooks(books);
      setPagination(pagination);
      setIsEmpty(books.length === 0);
    });
  }, [location.search]);

  return { books, pagination, isEmpty };
};

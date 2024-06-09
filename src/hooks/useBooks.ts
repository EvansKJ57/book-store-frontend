import { useLocation } from 'react-router-dom';
import { fetchBooks } from '../api/books.api';
import { QUERYSTRING } from '../const/querystring';
import { PAGESIZE } from '../const/pagination';
import { useQuery } from 'react-query';

export const useBooks = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const { data: booksData, isLoading: isBooksLoading } = useQuery(
    ['books', location.search],
    () =>
      fetchBooks({
        categoryId: params.get(QUERYSTRING.CATEGORY_ID)
          ? Number(params.get(QUERYSTRING.CATEGORY_ID))
          : undefined,
        newBooks: params.get(QUERYSTRING.NEW) ? true : undefined,
        curPage: params.get(QUERYSTRING.PAGE)
          ? Number(params.get(QUERYSTRING.PAGE))
          : 1,
        pageSize: PAGESIZE,
      })
  );

  return {
    books: booksData?.books,
    pagination: booksData?.pagination,
    isEmpty: booksData?.books.length === 0,
    isBooksLoading,
  };
};

import { useLocation } from 'react-router-dom';
import { fetchBooks } from '../api/books.api';
import { QUERYSTRING } from '../const/querystring';
import { PAGESIZE } from '../const/pagination';
import { useInfiniteQuery } from 'react-query';

export const useBooksInfinite = () => {
  const location = useLocation();

  const getBooks = ({ pageParam }: { pageParam: number }) => {
    const params = new URLSearchParams(location.search);
    const categoryId = params.get(QUERYSTRING.CATEGORY_ID)
      ? Number(params.get(QUERYSTRING.CATEGORY_ID))
      : undefined;

    const newBooks = params.get(QUERYSTRING.NEW) ? true : undefined;
    const pageSize = PAGESIZE;
    const curPage = pageParam;

    return fetchBooks({ categoryId, newBooks, pageSize, curPage });
  };

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    ['books', location.search],
    ({ pageParam = 1 }) => getBooks({ pageParam }),
    {
      getNextPageParam: (lastPage) => {
        const isLastPage =
          Math.ceil(lastPage.pagination.totalCount / PAGESIZE) ===
          lastPage.pagination.curPage;

        return isLastPage ? null : lastPage.pagination.curPage + 1;
      },
    }
  );
  const books = data ? data.pages.flatMap((page) => page.books) : [];
  const pagination = data ? data.pages[data.pages.length - 1].pagination : {};
  const isEmpty = books.length === 0;

  return {
    books,
    pagination,
    isEmpty,
    isBooksLoading: isFetching,
    fetchNextPage,
    hasNextPage,
  };
};

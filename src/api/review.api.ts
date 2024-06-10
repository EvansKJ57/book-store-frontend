import { IBookReviewItem, IBookReviewItemWrite } from '@/models/book.model';
import { requestHandler } from './http';

export const fetchBookReview = async (bookId: string) => {
  return await requestHandler<IBookReviewItem[]>('get', `/reviews/${bookId}`);
};

interface IAddBookReviewResponse {
  message: string;
}

export const addBookReview = async (
  bookId: string,
  data: IBookReviewItemWrite
) => {
  return await requestHandler<IAddBookReviewResponse>(
    'post',
    `/reviews/${bookId}`
  );
};

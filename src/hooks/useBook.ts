import { useEffect, useState } from 'react';
import {
  IBookReviewItem,
  IBookDetail,
  IBookReviewItemWrite,
} from '../models/book.model';
import { fetchBook, likeBook, unlikeBook } from '../api/books.api';
import { useAuthStore } from '../store/authStore';
import { useAlert } from './useAlert';
import { addCart } from '../api/carts.api';
import { addBookReview, fetchBookReview } from '@/api/review.api';
import { useToast } from './useToast';

export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<IBookDetail | null>(null);
  const { isLoggedIn } = useAuthStore();
  const [cartAdded, setCartAdded] = useState(false);
  const { showAlert } = useAlert();
  const [reviews, setReviews] = useState<IBookReviewItem[]>([]);

  const { showToast } = useToast();

  const likedToggle = () => {
    if (!isLoggedIn) {
      showAlert('로그인이 필요합니다.');
      return;
    }
    if (!book) return;
    if (book.liked) {
      unlikeBook(book.id).then(() => {
        setBook({
          ...book,
          likes: book.likes - 1,
          liked: false,
        });
      });
      showToast('좋아요가 취소되었습니다.');
    } else {
      likeBook(book.id).then(() => {
        setBook({
          ...book,
          likes: book.likes + 1,
          liked: true,
        });
      });
      showToast('좋아요가  성공했습니다.');
    }
  };
  const addToCart = (qty: number) => {
    if (!book) return;
    addCart({
      bookId: book.id,
      qty,
    }).then(() => {
      setCartAdded(true);
      setTimeout(() => {
        setCartAdded(false);
      }, 3000);
    });
  };

  useEffect(() => {
    if (!bookId) return;
    fetchBook(bookId).then((book) => setBook(book));

    fetchBookReview(bookId).then((reviews) => setReviews(reviews));
  }, [bookId]);

  const addReview = (data: IBookReviewItemWrite) => {
    if (!book) return;

    addBookReview(book.id.toString(), data).then((res) => {
      fetchBookReview(book.id.toString()).then((reviews) =>
        setReviews(reviews)
      );
      showAlert(res.message);
    });
  };

  return { book, likedToggle, addToCart, cartAdded, reviews, addReview };
};

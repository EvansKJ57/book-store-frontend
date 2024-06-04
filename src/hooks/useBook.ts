import { useEffect, useState } from 'react';
import { IBookDetail } from '../models/book.model';
import { fetchBook, likeBook, unlikeBook } from '../api/books.api';
import { useAuthStore } from '../store/authStore';
import { useAlert } from './useAlert';
import { addCart } from '../api/carts.api';

export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<IBookDetail | null>(null);
  const { isLoggedIn } = useAuthStore();
  const [cartAdded, setCartAdded] = useState(false);
  const { showAlert } = useAlert();

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
    } else {
      likeBook(book.id).then(() => {
        setBook({
          ...book,
          likes: book.likes + 1,
          liked: true,
        });
      });
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
  }, [bookId]);

  return { book, likedToggle, addToCart, cartAdded };
};

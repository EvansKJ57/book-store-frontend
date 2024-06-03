import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useBook } from '../hooks/useBook';
import { getImgSrc } from '../utils/image';
import Title from '../components/common/Title';
import { IBookDetail } from '../models/book.model';
import { formatDate, formatNumber } from '../utils/format';
import EllipsisBox from '../components/common/EllipsisBox';
import LikeButton from '../components/book/LikeButton';
import AddToCart from '../components/book/AddToCart';

const bookInfoList = [
  {
    label: '카테고리',
    key: 'categoryName',
    filter: (book: IBookDetail) => (
      <Link to={`/books?categoryId=${book.categoryId}`}>
        {book.categoryName}
      </Link>
    ),
  },
  {
    label: '포맷',
    key: 'form',
  },
  {
    label: '페이지',
    key: 'pages',
  },
  {
    label: 'ISBN',
    key: 'isbn',
  },
  {
    label: '출간일',
    key: 'pub_date',
    filter: (book: IBookDetail) => formatDate(book.pub_date),
  },
  {
    label: '가격',
    key: 'price',
    filter: (book: IBookDetail) => `${formatNumber(book.price)}원`,
  },
];

const BookDetail = () => {
  const { bookId } = useParams();
  const { book, likedToggle } = useBook(bookId);
  if (!book) return null;
  return (
    <BookDetailStyle>
      <header className="header">
        <div className="img">
          <img src={getImgSrc(book.img)} alt={book.title} />
        </div>
        <div className="info">
          <Title size="large" color="text">
            {book.title}
          </Title>
          {bookInfoList.map((item) => (
            <dl key={item.key}>
              <dt>{item.label}</dt>
              <dd>
                {item.filter
                  ? item.filter(book)
                  : book[item.key as keyof IBookDetail]}
              </dd>
            </dl>
          ))}
          <p className="summary">{book.summary}</p>
          <div className="like">
            <LikeButton book={book} onClick={likedToggle} />
          </div>
          <div className="add-cart">
            <AddToCart book={book} />
          </div>
        </div>
      </header>

      <div className="content">
        <Title size="medium">상세설명</Title>
        <EllipsisBox linelimit={4}>{book.detail}</EllipsisBox>
        <Title size="medium">목차</Title>
        <p className="index">{book.contents}</p>
      </div>
    </BookDetailStyle>
  );
};

const BookDetailStyle = styled.div`
  .header {
    display: flex;
    align-items: start;
    gap: 24px;
    padding: 0 0 24px 0;

    .img {
      flex: 1;
      img {
        width: 100%;
        height: auto;
      }
    }
    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;

      dl {
        display: flex;
        margin: 0;

        dt {
          width: 80px;
          color: ${({ theme }) => theme.color.secondary};
        }
        a {
          color: ${({ theme }) => theme.color.primary};
          text-decoration: none;
        }
      }
    }
  }
`;
export default BookDetail;

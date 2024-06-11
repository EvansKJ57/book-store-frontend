import React from 'react';
import { IBookReviewItem, IBookReviewItemWrite } from '../../models/book.model';
import BookReviewItem from './BookReviewItem';
import styled from 'styled-components';
import BookReviewAdd from './BookReviewAdd';

interface Props {
  reviews: IBookReviewItem[];
  onAdd: (data: IBookReviewItemWrite) => void;
}

const BookReview = ({ reviews, onAdd }: Props) => {
  return (
    <BookReviewStyle>
      <BookReviewAdd onAdd={onAdd} />
      {reviews.map((review) => (
        <BookReviewItem key={review.id} review={review} />
      ))}
    </BookReviewStyle>
  );
};

const BookReviewStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default BookReview;

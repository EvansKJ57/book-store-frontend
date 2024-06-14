import { IBook } from '@/models/book.model';
import styled from 'styled-components';
import BookBestItem from '../books/BookBestItem';

interface Props {
  books: IBook[];
}

const MainBestBooks = ({ books }: Props) => {
  return (
    <MainBestBooksStyle>
      {books.map((book, index) => (
        <BookBestItem key={book.id} book={book} itemIndex={index} />
      ))}
    </MainBestBooksStyle>
  );
};

const MainBestBooksStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;

  @media (${({ theme }) => theme.mediaQuery.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default MainBestBooks;

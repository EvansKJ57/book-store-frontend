import { getByAltText, getByText, render } from '@testing-library/react';
import { BookStoreThemeProvider } from '../../context/themeContext';
import BookItem from './BookItem';

const dummyBook = {
  id: 1,
  title: 'Dummy Book',
  img: 5,
  categoryId: 1,
  summary: 'Dummy Summary',
  author: 'Dummy Author',
  price: 10000,
  likes: 1,
  form: 'paperback',
  isbn: 'Dummy ISBN',
  detail: 'Dummy Detail',
  pages: 100,
  contents: 'Dummy Contents',
  pub_date: '2021-01-01',
};

describe('Book item test', () => {
  it('render test', () => {
    const { getByText, getByAltText } = render(
      <BookStoreThemeProvider>
        <BookItem book={dummyBook} />
      </BookStoreThemeProvider>
    );
    expect(getByText(dummyBook.title)).toBeInTheDocument();
    expect(getByText(dummyBook.summary)).toBeInTheDocument();
    expect(getByText(dummyBook.author)).toBeInTheDocument();
    expect(getByText('10,000원')).toBeInTheDocument();
    expect(getByText(dummyBook.likes)).toBeInTheDocument();
    expect(getByAltText(dummyBook.title)).toHaveAttribute(
      'src',
      `https://picsum.photos/id/${dummyBook.img}/600/600`
    );
  });
});

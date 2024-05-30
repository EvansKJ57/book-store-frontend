import { render, screen } from '@testing-library/react';
import Title from './Title';
import { BookStoreThemeProvider } from '../../context/themeContext';

describe('title component check', () => {
  it('render check', () => {
    render(
      <BookStoreThemeProvider>
        <Title size="large">title</Title>
      </BookStoreThemeProvider>
    );
    expect(screen.getByText('title')).toBeInTheDocument();
  });

  it('size props check', () => {
    const { container } = render(
      <BookStoreThemeProvider>
        <Title size="large">제목</Title>
      </BookStoreThemeProvider>
    );

    expect(container.firstChild).toHaveStyle({ fontSize: '2rem' });
  });

  it('color props check', () => {
    const { container } = render(
      <BookStoreThemeProvider>
        <Title size="large" color="primary">
          제목
        </Title>
      </BookStoreThemeProvider>
    );
    expect(container.firstChild).toHaveStyle({ color: 'brown' });
  });
});

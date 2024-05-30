import { screen, render } from '@testing-library/react';
import Button from './Button';
import { BookStoreThemeProvider } from '../../context/themeContext';

describe('Button component test', () => {
  it('render check', () => {
    render(
      <BookStoreThemeProvider>
        <Button size="large" scheme="primary">
          button
        </Button>
      </BookStoreThemeProvider>
    );
    expect(screen.getByText('button')).toBeInTheDocument();
  });

  it('size props check', () => {
    render(
      <BookStoreThemeProvider>
        <Button size="large" scheme="primary">
          button
        </Button>
      </BookStoreThemeProvider>
    );
    expect(screen.getByRole('button')).toHaveStyle({
      fontSize: '1.5rem',
    });
  });
  it('button background color check', () => {
    render(
      <BookStoreThemeProvider>
        <Button size="large" scheme="primary">
          button
        </Button>
      </BookStoreThemeProvider>
    );
    expect(screen.getByRole('button')).toHaveStyle({
      backgroundColor: 'midnightblue',
    });
  });
});

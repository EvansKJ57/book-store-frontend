import { render, screen } from '@testing-library/react';
import { BookStoreThemeProvider } from '../../context/themeContext';
import InputText from './InputText';
import React from 'react';

describe('input component check', () => {
  it('render check', () => {
    render(
      <BookStoreThemeProvider>
        <InputText placeholder="something" />
      </BookStoreThemeProvider>
    );
    expect(screen.getByPlaceholderText('something')).toBeInTheDocument();
  });

  it('forwardRef test', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(
      <BookStoreThemeProvider>
        <InputText placeholder="something" ref={ref} />
      </BookStoreThemeProvider>
    );
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});

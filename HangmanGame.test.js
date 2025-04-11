
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import HangmanGame from './HangmanGame';

describe('HangmanGame Component', () => {
  test('renders initial state', () => {
    render(<HangmanGame />);
    expect(screen.getByText(/mistakes: 0/i)).toBeInTheDocument();
  });

  test('allows a letter guess', () => {
    render(<HangmanGame />);
    const input = screen.getByPlaceholderText(/enter a letter/i);
    fireEvent.change(input, { target: { value: 'r' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(screen.getByText('r')).toBeInTheDocument();
  });
});

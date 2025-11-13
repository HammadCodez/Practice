import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('App Component', () => {
  it('should render the MERN Todo title', () => {
    render(<App />);
    expect(screen.getByText('MERN Todo')).toBeInTheDocument();
  });

  it('should have an input field for adding todos', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Add todo...');
    expect(input).toBeInTheDocument();
  });

  it('should have an Add button', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });
});

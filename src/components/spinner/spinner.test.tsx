import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Spinner from './spinner';

describe('Spinner Component', () => {
  it('should render loading text', () => {
    render(<Spinner />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render spinner container', () => {
    const { container } = render(<Spinner />);

    const spinnerContainer = container.querySelector('.spinner-container');
    expect(spinnerContainer).toBeInTheDocument();
  });

  it('should render spinner element', () => {
    const { container } = render(<Spinner />);

    const spinner = container.querySelector('.spinner');
    expect(spinner).toBeInTheDocument();
  });
});

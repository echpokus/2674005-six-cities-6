import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFoundPage from './not-found-page';

describe('NotFoundPage Component', () => {
  it('should render 404 title', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('should render "Page not found" message', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );

    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('should render description message', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/The page you are looking for doesn't exist/i)).toBeInTheDocument();
  });

  it('should render link to main page', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );

    const link = screen.getByText('Go to main page');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/');
  });

  it('should render logo with correct link', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );

    const logo = screen.getByAltText('6 cities logo');
    expect(logo).toBeInTheDocument();
    const logoLink = logo.closest('a');
    expect(logoLink).toHaveAttribute('href', '/');
  });
});

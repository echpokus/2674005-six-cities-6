import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HeaderLogo from './header-logo';

describe('HeaderLogo Component', () => {
  it('should render logo correctly', () => {
    render(
      <BrowserRouter>
        <HeaderLogo />
      </BrowserRouter>
    );

    const logo = screen.getByAltText('6 cities logo');
    expect(logo).toBeInTheDocument();
  });

  it('should have correct link to home page', () => {
    render(
      <BrowserRouter>
        <HeaderLogo />
      </BrowserRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });

  it('should apply active class when isActive is true', () => {
    render(
      <BrowserRouter>
        <HeaderLogo isActive />
      </BrowserRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveClass('header__logo-link--active');
  });

  it('should not apply active class when isActive is false', () => {
    render(
      <BrowserRouter>
        <HeaderLogo isActive={false} />
      </BrowserRouter>
    );

    const link = screen.getByRole('link');
    expect(link).not.toHaveClass('header__logo-link--active');
  });
});

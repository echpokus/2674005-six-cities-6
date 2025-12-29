import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitiesList from './cities-list';

describe('CitiesList Component', () => {
  it('should render all cities', () => {
    const mockOnCityChange = vi.fn();
    render(<CitiesList currentCity="Paris" onCityChange={mockOnCityChange} />);

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Cologne')).toBeInTheDocument();
    expect(screen.getByText('Brussels')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('Hamburg')).toBeInTheDocument();
    expect(screen.getByText('Dusseldorf')).toBeInTheDocument();
  });

  it('should highlight current city', () => {
    const mockOnCityChange = vi.fn();
    render(<CitiesList currentCity="Amsterdam" onCityChange={mockOnCityChange} />);

    const amsterdamLink = screen.getByText('Amsterdam').closest('a');
    expect(amsterdamLink).toHaveClass('tabs__item--active');
  });

  it('should call onCityChange when city is clicked', async () => {
    const mockOnCityChange = vi.fn();
    const user = userEvent.setup();

    render(<CitiesList currentCity="Paris" onCityChange={mockOnCityChange} />);

    const cologneLink = screen.getByText('Cologne').closest('a');
    if (cologneLink) {
      await user.click(cologneLink);
    }

    expect(mockOnCityChange).toHaveBeenCalledWith('Cologne');
  });

  it('should not highlight non-current cities', () => {
    const mockOnCityChange = vi.fn();
    render(<CitiesList currentCity="Paris" onCityChange={mockOnCityChange} />);

    const cologneLink = screen.getByText('Cologne').closest('a');
    expect(cologneLink).not.toHaveClass('tabs__item--active');
  });
});

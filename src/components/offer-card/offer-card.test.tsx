import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import OfferCard from './offer-card';
import type { Offer } from '../../types/offer';

const mockOffer: Offer = {
  id: '1',
  title: 'Beautiful apartment',
  type: 'apartment',
  price: 120,
  previewImage: '/img/apartment-01.jpg',
  city: {
    name: 'Paris',
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      zoom: 12
    }
  },
  location: {
    latitude: 48.8566,
    longitude: 2.3522,
    zoom: 12
  },
  isFavorite: false,
  isPremium: false,
  rating: 4.5
};

describe('OfferCard Component', () => {
  it('should render offer title', () => {
    render(
      <BrowserRouter>
        <OfferCard offer={mockOffer} />
      </BrowserRouter>
    );

    expect(screen.getByText('Beautiful apartment')).toBeInTheDocument();
  });

  it('should render offer price', () => {
    render(
      <BrowserRouter>
        <OfferCard offer={mockOffer} />
      </BrowserRouter>
    );

    expect(screen.getByText('€120')).toBeInTheDocument();
  });

  it('should render offer type', () => {
    render(
      <BrowserRouter>
        <OfferCard offer={mockOffer} />
      </BrowserRouter>
    );

    expect(screen.getByText('apartment')).toBeInTheDocument();
  });

  it('should render Premium mark when offer is premium', () => {
    const premiumOffer = { ...mockOffer, isPremium: true };
    render(
      <BrowserRouter>
        <OfferCard offer={premiumOffer} />
      </BrowserRouter>
    );

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should not render Premium mark when offer is not premium', () => {
    render(
      <BrowserRouter>
        <OfferCard offer={mockOffer} />
      </BrowserRouter>
    );

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('should render offer image with correct src and alt', () => {
    render(
      <BrowserRouter>
        <OfferCard offer={mockOffer} />
      </BrowserRouter>
    );

    const image = screen.getByAltText('Beautiful apartment');
    expect(image).toHaveAttribute('src', '/img/apartment-01.jpg');
  });

  it('should have correct link to offer details page', () => {
    render(
      <BrowserRouter>
        <OfferCard offer={mockOffer} />
      </BrowserRouter>
    );

    const links = screen.getAllByRole('link');
    const titleLink = links.find((link) => link.textContent === 'Beautiful apartment');
    expect(titleLink).toHaveAttribute('href', '/offer/1');
  });

  it('should render bookmark button', () => {
    render(
      <BrowserRouter>
        <OfferCard offer={mockOffer} />
      </BrowserRouter>
    );

    const bookmarkButton = screen.getByRole('button');
    expect(bookmarkButton).toBeInTheDocument();
  });
});

import React, { memo, useCallback } from 'react';
import OfferCard from '../offer-card/offer-card';
import type { Offer } from '../../types/offer';

type OffersListProps = {
  offers: Offer[];
  onOfferHover?: (id: string | null) => void;
};

function OffersListComponent({ offers, onOfferHover }: OffersListProps): JSX.Element {
  const handleMouseEnter = useCallback((id: string) => {
    onOfferHover?.(id);
  }, [onOfferHover]);

  const handleMouseLeave = useCallback(() => {
    onOfferHover?.(null);
  }, [onOfferHover]);

  return (
    <>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={onOfferHover ? () => handleMouseEnter(offer.id) : undefined}
          onMouseLeave={onOfferHover ? handleMouseLeave : undefined}
        />
      ))}
    </>
  );
}

const OffersList = memo(OffersListComponent);
export default OffersList;

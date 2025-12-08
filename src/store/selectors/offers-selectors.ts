import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';

// Base selectors
export const selectCity = (state: RootState) => state.offers.city;
export const selectAllOffers = (state: RootState) => state.offers.offers;
export const selectOffersLoading = (state: RootState) => state.offers.isLoading;
export const selectOffersError = (state: RootState) => state.offers.hasError;

// Memoized selectors
export const selectCityOffers = createSelector(
  [selectAllOffers, selectCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city)
);

export const selectFavoriteOffers = createSelector(
  [selectAllOffers],
  (offers) => offers.filter((offer) => offer.isFavorite)
);

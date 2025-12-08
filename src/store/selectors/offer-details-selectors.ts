import type { RootState } from '../index';

export const selectCurrentOffer = (state: RootState) => state.offerDetails.currentOffer;
export const selectNearbyOffers = (state: RootState) => state.offerDetails.nearbyOffers;
export const selectComments = (state: RootState) => state.offerDetails.comments;
export const selectOfferLoading = (state: RootState) => state.offerDetails.isOfferLoading;
export const selectCommentsLoading = (state: RootState) => state.offerDetails.isCommentsLoading;
export const selectOfferError = (state: RootState) => state.offerDetails.hasOfferError;

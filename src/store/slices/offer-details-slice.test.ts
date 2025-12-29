import { describe, it, expect } from 'vitest';
import { offerDetailsSlice, clearCurrentOffer } from './offer-details-slice';
import { fetchOfferDetails, fetchNearbyOffers, fetchComments, postComment } from '../api-actions';

const initialState = {
  currentOffer: null,
  nearbyOffers: [],
  comments: [],
  isOfferLoading: false,
  isCommentsLoading: false,
  hasOfferError: false
};

const mockOffer = {
  id: '1',
  title: 'Test Offer',
  type: 'apartment',
  price: 100,
  previewImage: 'test.jpg',
  city: {
    name: 'Paris',
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 }
  },
  location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 },
  isFavorite: false,
  isPremium: false,
  rating: 4.5
};

const mockComment = {
  id: '1',
  date: '2024-01-01',
  user: {
    name: 'User',
    avatarUrl: 'avatar.jpg',
    isPro: false
  },
  comment: 'Great place!',
  rating: 5
};

describe('offerDetailsSlice', () => {
  it('should return initial state', () => {
    expect(offerDetailsSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(initialState);
  });

  it('should handle clearCurrentOffer', () => {
    const state = offerDetailsSlice.reducer(
      {
        ...initialState,
        currentOffer: mockOffer,
        nearbyOffers: [mockOffer],
        comments: [mockComment],
        hasOfferError: true
      },
      clearCurrentOffer()
    );
    expect(state.currentOffer).toBeNull();
    expect(state.nearbyOffers).toEqual([]);
    expect(state.comments).toEqual([]);
    expect(state.hasOfferError).toBe(false);
  });

  it('should handle fetchOfferDetails.pending', () => {
    const state = offerDetailsSlice.reducer(
      initialState,
      fetchOfferDetails.pending('', '1')
    );
    expect(state.isOfferLoading).toBe(true);
    expect(state.hasOfferError).toBe(false);
  });

  it('should handle fetchOfferDetails.fulfilled', () => {
    const state = offerDetailsSlice.reducer(
      { ...initialState, isOfferLoading: true },
      fetchOfferDetails.fulfilled(mockOffer, '', '1')
    );
    expect(state.currentOffer).toEqual(mockOffer);
    expect(state.isOfferLoading).toBe(false);
    expect(state.hasOfferError).toBe(false);
  });

  it('should handle fetchOfferDetails.rejected', () => {
    const state = offerDetailsSlice.reducer(
      { ...initialState, isOfferLoading: true, currentOffer: mockOffer },
      fetchOfferDetails.rejected(null, '', '1')
    );
    expect(state.isOfferLoading).toBe(false);
    expect(state.currentOffer).toBeNull();
    expect(state.hasOfferError).toBe(true);
  });

  it('should handle fetchNearbyOffers.fulfilled', () => {
    const nearbyOffers = [mockOffer];
    const state = offerDetailsSlice.reducer(
      initialState,
      fetchNearbyOffers.fulfilled(nearbyOffers, '', '1')
    );
    expect(state.nearbyOffers).toEqual(nearbyOffers);
  });

  it('should handle fetchComments.pending', () => {
    const state = offerDetailsSlice.reducer(
      initialState,
      fetchComments.pending('', '1')
    );
    expect(state.isCommentsLoading).toBe(true);
  });

  it('should handle fetchComments.fulfilled', () => {
    const comments = [mockComment];
    const state = offerDetailsSlice.reducer(
      { ...initialState, isCommentsLoading: true },
      fetchComments.fulfilled(comments, '', '1')
    );
    expect(state.comments).toEqual(comments);
    expect(state.isCommentsLoading).toBe(false);
  });

  it('should handle fetchComments.rejected', () => {
    const state = offerDetailsSlice.reducer(
      { ...initialState, isCommentsLoading: true },
      fetchComments.rejected(null, '', '1')
    );
    expect(state.isCommentsLoading).toBe(false);
  });

  it('should handle postComment.fulfilled', () => {
    const existingComments = [mockComment];
    const newComment = {
      id: '2',
      date: '2024-01-02',
      user: {
        name: 'Another User',
        avatarUrl: 'avatar2.jpg',
        isPro: true
      },
      comment: 'Nice!',
      rating: 4
    };
    const state = offerDetailsSlice.reducer(
      { ...initialState, comments: existingComments },
      postComment.fulfilled(newComment, '', { offerId: '1', comment: { comment: 'Nice!', rating: 4 } })
    );
    expect(state.comments).toHaveLength(2);
    expect(state.comments[1]).toEqual(newComment);
  });
});

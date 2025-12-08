import { createReducer } from '@reduxjs/toolkit';
import { changeCity, requireAuthorization, clearCurrentOffer } from './action';
import { 
  fetchOffers, 
  checkAuth, 
  login,
  logout,
  fetchOfferDetails, 
  fetchNearbyOffers, 
  fetchComments,
  postComment 
} from './api-actions';
import { AuthorizationStatus } from '../const';
import type { Offer } from '../types/offer';
import type { User } from '../types/user';
import type { Comment } from '../types/comment';

type State = {
  city: string;
  offers: Offer[];
  isLoading: boolean;
  hasError: boolean;
  authorizationStatus: AuthorizationStatus;
  user: User | null;
  currentOffer: Offer | null;
  nearbyOffers: Offer[];
  comments: Comment[];
  isOfferLoading: boolean;
  isCommentsLoading: boolean;
  hasOfferError: boolean;
};

const initialState: State = {
  city: 'Paris',
  offers: [],
  isLoading: false,
  hasError: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  currentOffer: null,
  nearbyOffers: [],
  comments: [],
  isOfferLoading: false,
  isCommentsLoading: false,
  hasOfferError: false
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(fetchOffers.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    })
    .addCase(fetchOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchOffers.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    })
    .addCase(checkAuth.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.user = action.payload;
    })
    .addCase(checkAuth.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.user = action.payload;
    })
    .addCase(login.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(logout.fulfilled, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.user = null;
    })
    .addCase(fetchOfferDetails.pending, (state) => {
      state.isOfferLoading = true;
      state.hasOfferError = false;
    })
    .addCase(fetchOfferDetails.fulfilled, (state, action) => {
      state.currentOffer = action.payload;
      state.isOfferLoading = false;
      state.hasOfferError = false;
    })
    .addCase(fetchOfferDetails.rejected, (state) => {
      state.isOfferLoading = false;
      state.currentOffer = null;
      state.hasOfferError = true;
    })
    .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(fetchComments.pending, (state) => {
      state.isCommentsLoading = true;
    })
    .addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.isCommentsLoading = false;
    })
    .addCase(fetchComments.rejected, (state) => {
      state.isCommentsLoading = false;
    })
    .addCase(postComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    })
    .addCase(clearCurrentOffer, (state) => {
      state.currentOffer = null;
      state.nearbyOffers = [];
      state.comments = [];
      state.hasOfferError = false;
    });
});

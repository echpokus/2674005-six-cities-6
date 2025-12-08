import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { userSlice } from './slices/user-slice';
import { offersSlice } from './slices/offers-slice';
import { offerDetailsSlice } from './slices/offer-details-slice';

const api = createAPI();

const rootReducer = combineReducers({
  user: userSlice.reducer,
  offers: offersSlice.reducer,
  offerDetails: offerDetailsSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

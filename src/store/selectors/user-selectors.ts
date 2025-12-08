import type { RootState } from '../index';

export const selectAuthorizationStatus = (state: RootState) => state.user.authorizationStatus;
export const selectUser = (state: RootState) => state.user.user;

import { describe, it, expect } from 'vitest';
import { userSlice, requireAuthorization } from './user-slice';
import { checkAuth, login, logout } from '../api-actions';
import { AuthorizationStatus } from '../../const';

const initialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null
};

const mockUser = {
  name: 'John Doe',
  avatarUrl: 'avatar.jpg',
  isPro: false,
  email: 'test@test.com',
  token: 'test-token'
};

describe('userSlice', () => {
  it('should return initial state', () => {
    expect(userSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(initialState);
  });

  it('should handle requireAuthorization', () => {
    const state = userSlice.reducer(
      initialState,
      requireAuthorization(AuthorizationStatus.Auth)
    );
    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('should handle checkAuth.fulfilled', () => {
    const state = userSlice.reducer(
      initialState,
      checkAuth.fulfilled(mockUser, '', undefined)
    );
    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(state.user).toEqual(mockUser);
  });

  it('should handle checkAuth.rejected', () => {
    const state = userSlice.reducer(
      initialState,
      checkAuth.rejected(null, '', undefined)
    );
    expect(state.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('should handle login.fulfilled', () => {
    const state = userSlice.reducer(
      initialState,
      login.fulfilled(mockUser, '', { email: 'test@test.com', password: 'password' })
    );
    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(state.user).toEqual(mockUser);
  });

  it('should handle login.rejected', () => {
    const state = userSlice.reducer(
      initialState,
      login.rejected(null, '', { email: 'test@test.com', password: 'password' })
    );
    expect(state.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('should handle logout.fulfilled', () => {
    const state = userSlice.reducer(
      { authorizationStatus: AuthorizationStatus.Auth, user: mockUser },
      logout.fulfilled(undefined, '', undefined)
    );
    expect(state.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(state.user).toBeNull();
  });
});

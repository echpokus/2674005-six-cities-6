import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import type { User } from '../../types/user';

type HeaderNavProps = {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
  favoriteCount: number;
  onLogout?: () => void;
};

function HeaderNavComponent({ authorizationStatus, user, favoriteCount, onLogout }: HeaderNavProps): JSX.Element {
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {authorizationStatus === AuthorizationStatus.Auth ? (
          <>
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                <div className="header__avatar-wrapper user__avatar-wrapper">
                  {user?.avatarUrl && (
                    <img 
                      src={user.avatarUrl} 
                      alt="User avatar" 
                      style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                    />
                  )}
                </div>
                <span className="header__user-name user__name">{user?.email}</span>
                <span className="header__favorite-count">{favoriteCount}</span>
              </Link>
            </li>
            {onLogout && (
              <li className="header__nav-item">
                <a 
                  className="header__nav-link" 
                  href="#" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    onLogout(); 
                  }}
                >
                  <span className="header__signout">Sign out</span>
                </a>
              </li>
            )}
          </>
        ) : (
          <li className="header__nav-item">
            <Link className="header__nav-link" to="/login">
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

const HeaderNav = memo(HeaderNavComponent);
export default HeaderNav;

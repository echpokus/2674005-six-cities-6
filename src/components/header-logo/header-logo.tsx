import React, { memo } from 'react';
import { Link } from 'react-router-dom';

type HeaderLogoProps = {
  isActive?: boolean;
};

function HeaderLogoComponent({ isActive = false }: HeaderLogoProps): JSX.Element {
  return (
    <div className="header__left">
      <Link 
        className={`header__logo-link ${isActive ? 'header__logo-link--active' : ''}`} 
        to="/"
      >
        <img
          className="header__logo"
          src="/img/logo.svg"
          alt="6 cities logo"
          width="81"
          height="41"
        />
      </Link>
    </div>
  );
}

const HeaderLogo = memo(HeaderLogoComponent);
export default HeaderLogo;

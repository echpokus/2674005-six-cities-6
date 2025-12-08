import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--gray">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img
                  className="header__logo"
                  src="/img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index page__main--index-empty" style={{ height: 'calc(100vh - 70px)', display: 'flex', alignItems: 'center' }}>
        <div className="cities" style={{ width: '100%' }}>
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper" style={{ textAlign: 'center' }}>
                <b className="cities__status" style={{ fontSize: '96px', marginBottom: '10px' }}>404</b>
                <p className="cities__status-description" style={{ fontSize: '20px', marginBottom: '10px' }}>
                  Page not found
                </p>
                <p className="cities__status-description" style={{ marginBottom: '20px' }}>
                  The page you are looking for doesn&apos;t exist.
                </p>
                <Link to="/" className="button">
                  Go to main page
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;

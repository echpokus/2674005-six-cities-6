import React from 'react';
import { Link } from 'react-router-dom';
import type { Offer } from '../../types/offer';

type OfferCardProps = {
  offer: Offer;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

function OfferCard({ offer, onMouseEnter, onMouseLeave }: OfferCardProps): JSX.Element {
  return (
    <article
      className="cities__card place-card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width="260"
            height="200"
            alt={offer.title}
          />
        </Link>
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars" style={{ position: 'relative', width: '73px', height: '12px' }}>
            <img src="/img/stars.svg" alt="rating" style={{ position: 'absolute', top: 0, left: 0, width: '73px', height: '12px' }} />
            <img src="/img/stars-active.svg" alt="active rating" style={{ position: 'absolute', top: 0, left: 0, width: '73px', height: '12px', clipPath: `inset(0 ${100 - offer.rating * 20}% 0 0)` }} />
          </div>
          <span className="visually-hidden">Rating</span>
        </div>

        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>

        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default OfferCard;

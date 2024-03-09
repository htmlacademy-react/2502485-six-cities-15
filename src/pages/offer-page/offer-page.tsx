import React from 'react';
import Header from '../../components/header/header';
import PlaceCard from '../../components/place-card/place-card';
import PageNotFound from '../page-not-found/page-not-found';
import Reviews from '../../components/reviews/reviews';
import { AuthorizationStatus } from '../../const';
import { capitalizeFirstLetter } from '../../utils';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { TOffer, TOfferCard, TComment } from '../../types';
import { Settings } from '../../const';

type OfferPageProprs = {
  offers: TOffer[];
  nearbyOfferCards: TOfferCard[];
  authorizationStatus: AuthorizationStatus;
  comments: TComment[];
}

function OfferPage ({ offers, nearbyOfferCards, authorizationStatus, comments }: OfferPageProprs): JSX.Element{
  const { id } = useParams();
  const currentOffer: TOffer | undefined = offers.find((offer:TOffer) => offer.id === id);

  if (!currentOffer){
    return <PageNotFound /> ;
  }

  const capacityTitle = `Max\u00a0${currentOffer.maxAdults}\u00a0${currentOffer.maxAdults > 1 ? 'adults' : 'adult'}`;
  const bedroomsTitle = `${currentOffer.bedrooms}\u00a0${currentOffer.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}`;

  return(
    <div className="page">
      <Helmet>
        <title>6 cities. Offer</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {
                currentOffer.images.map((src) => (
                  <div className="offer__image-wrapper" key={src}>
                    <img className="offer__image" src={src} alt="Offer photo" />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && (<div className="offer__mark"><span>Premium</span></div>)}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{currentOffer.title}</h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${currentOffer.rating * (100 / Settings.maxRating)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {currentOffer.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {capitalizeFirstLetter(currentOffer.type)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedroomsTitle}
                </li>
                <li className="offer__feature offer__feature--adults">
                  {capacityTitle}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods.map((good) => (
                    <li className="offer__inside-item" key={good}>{good}</li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={currentOffer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">{currentOffer.host.name}</span>
                  { currentOffer.host.isPro && <span className="offer__user-status">Pro</span> }
                </div>
                <div className="offer__description">
                  <p className="offer__text">{currentOffer.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
                <Reviews isAuth={authorizationStatus === AuthorizationStatus.Auth} comments={comments} />
              </section>
            </div>
          </div>
          <section className="offer__map map"></section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {
                nearbyOfferCards.map((offerCard)=>(
                  <React.Fragment key={offerCard.id}>
                    <PlaceCard offerCard={offerCard} />
                  </React.Fragment>
                ))
              }
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Settings } from './const';
import { offerCards, offers, nearbyOfferCards, favoriteOffers } from './mocks/offers';
import { comments } from './mocks/comments';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      placesCount = {Settings.placesCount}
      offerCards = {offerCards}
      offers = {offers}
      nearbyOfferCards = {nearbyOfferCards}
      favoriteOffers = {favoriteOffers}
      comments = {comments}
    />
  </React.StrictMode>
);

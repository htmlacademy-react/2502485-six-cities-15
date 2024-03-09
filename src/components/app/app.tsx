import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import PageNotFound from '../../pages/page-not-found/page-not-found';
import { HelmetProvider } from 'react-helmet-async';
import { TOfferCard, TOffer, TComment } from '../../types';

type AppProps = {
  offerCards: TOfferCard[];
  offers: TOffer[];
  nearbyOfferCards: TOfferCard[];
  favoriteOffers: TOfferCard[];
  comments: TComment[];
}

function App ({offerCards, offers, nearbyOfferCards, favoriteOffers, comments}: AppProps): JSX.Element{
  const authorizationStatus = AuthorizationStatus.Auth;

  return(
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={
              <MainPage
                offerCards = {offerCards}
              />
            }
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <FavoritesPage favoriteOffers={favoriteOffers} />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={
              <OfferPage
                offers={offers}
                nearbyOfferCards={nearbyOfferCards}
                authorizationStatus={authorizationStatus}
                comments={comments}
              />
            }
          />
          <Route
            path="*"
            element={<PageNotFound />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
